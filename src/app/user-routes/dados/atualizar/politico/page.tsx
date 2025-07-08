"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/external/ui-shacnui/alert-dialog";
import { Button } from "@/components/external/ui-shacnui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/external/ui-shacnui/form";
import { Input } from "@/components/external/ui-shacnui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/external/ui-shacnui/select";
import { MultiSelectPopover } from "@/components/ui/dropdown/MultiSelectPopover";
import Loading from "@/components/ui/loading";

import { oswald } from "../../../../../fonts/fonts";
import { APIAtualizarPoliticoPayload } from "../../../../../hooks/options/politico";

import { ResponsePoliticoDTO } from "@/core/domain/dtos/politico.dto";
import { ResponseProjetoDTO } from "@/core/domain/dtos/projeto.dto";
import { useEstado } from "@/hooks/estado/use-estado";
import { usePartido } from "@/hooks/partido/use-partido";
import { usePolitico } from "@/hooks/politico/use-politico";
import { usePoliticoAtualizar } from "@/hooks/politico/use-politico-update";
import { useProfissao } from "@/hooks/profissao/use-profissao";
import { useProjeto } from "@/hooks/projeto/use-projeto";

const formSchema = z.object({
	nome: z.string().min(1, { message: "Nome obrigatório" }),
	genero: z.string().min(1, { message: "Gênero obrigatório" }),
	raca: z.string().min(1, { message: "Raça obrigatória" }),
	religiao: z.string().min(1, { message: "Religião obrigatória" }),
	ideologia: z.string().min(1, { message: "Ideologia obrigatória" }),
	partido: z.string().min(1, { message: "Partido obrigatório" }),
	estado: z.string().min(1, { message: "Estado obrigatório" }),
	profissao: z.string().min(1, { message: "Profissão obrigatória" }),
	projetos: z.array(z.string()).min(1, { message: "Projetos obrigatórios" }),
	esfera: z.string().min(1, { message: "Esfera obrigatória" }),
	foto: z.string().min(1, { message: "Foto obrigatória" }),
});

//! ＼（〇_ｏ）／GAMBIARRA
const esferas = [
	{
		value: "federal",
		label: "Federal",
		id: "3f7f7a27-ccf6-42ea-adf3-2d168938bccc",
	},
	{
		value: "estadual",
		label: "Estadual",
		id: "8c6dde7a-e2c3-423d-8ae0-cf8262128566",
	},
];

const Page: React.FC = () => {
	const { profissoes, isLoadingProfissoes } = useProfissao();
	const { partidos, isLoadingPartidos } = usePartido();
	const { projetos, isLoadingProjetos } = useProjeto();
	const { estados, isLoadingEstados } = useEstado();
	const { politicos, isLoadingPoliticos } = usePolitico();

	const {
		atualizarPolitico,
		isUpdatingPolitico,
		hasAtualizarPoliticoSucess,
		hasAtualizarPoliticoError,
	} = usePoliticoAtualizar();

	const [selectedPolitico, setSelectedPolitico] =
		useState<ResponsePoliticoDTO>();
	const [isOpenList, setIsOpenList] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [showSuccess, setShowSuccess] = useState(false);
	const [showError, setShowError] = useState(false);

	const isLoadingSelects =
		isLoadingProfissoes ||
		isLoadingPartidos ||
		isLoadingProjetos ||
		isLoadingEstados ||
		isLoadingPoliticos;

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nome: "",
			genero: "",
			raca: "",
			religiao: "",
			ideologia: "",
			partido: "",
			estado: "",
			profissao: "",
			projetos: [],
			esfera: "",
			foto: "",
		},
	});

	useEffect(() => {
		if (selectedPolitico) {
			form.setValue("nome", selectedPolitico.nome || "");
			form.setValue("genero", selectedPolitico.genero || "");
			form.setValue("raca", selectedPolitico.raca || "");
			form.setValue("religiao", selectedPolitico.religiao || "");
			form.setValue("ideologia", selectedPolitico.ideologia || "");
			form.setValue("partido", selectedPolitico.partidoId || "");
			form.setValue("estado", selectedPolitico.estadoId || "");
			form.setValue("profissao", selectedPolitico.profissaoId || "");
			form.setValue(
				"projetos",
				selectedPolitico.projetos
					? selectedPolitico.projetos.map((p: ResponseProjetoDTO) => p.id)
					: []
			);
			form.setValue("esfera", selectedPolitico.esferaId || "");
			form.setValue("foto", selectedPolitico.foto || "");
		} else {
			form.reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedPolitico]);

	useEffect(() => {
		if (hasAtualizarPoliticoSucess) {
			setShowSuccess(true);
			form.reset();
			setSelectedPolitico(undefined);
			const timeout = setTimeout(() => setShowSuccess(false), 4000);
			return () => clearTimeout(timeout);
		}
	}, [hasAtualizarPoliticoSucess, form]);

	useEffect(() => {
		if (hasAtualizarPoliticoError) {
			setShowError(true);
			const timeout = setTimeout(() => setShowError(false), 4000);
			return () => clearTimeout(timeout);
		}
	}, [hasAtualizarPoliticoError]);

	const filteredPoliticos = useMemo(() => {
		if (!politicos) return [];
		if (!searchTerm) return politicos;
		return politicos.filter((p: ResponsePoliticoDTO) =>
			p.nome.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [politicos, searchTerm]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		if (!selectedPolitico) return;

		function capitalizeFirst(str: string) {
			return str
				.trim()
				.toLowerCase()
				.replace(/^./, (c) => c.toUpperCase());
		}

		const payload: APIAtualizarPoliticoPayload = {
			id: selectedPolitico.id,
			data: {
				id: selectedPolitico.id,
				nome: capitalizeFirst(values.nome),
				genero: capitalizeFirst(values.genero),
				raca: capitalizeFirst(values.raca),
				religiao: capitalizeFirst(values.religiao),
				ideologia: values.ideologia,
				esferaId: values.esfera,
				estadoId: values.estado,
				partidoId: values.partido,
				profissaoId: values.profissao,
				projetos: values.projetos,
				foto: values.foto,
			},
		};

		atualizarPolitico({
			payload,
		});
	}

	if (isLoadingSelects)
		return (
			<div className="h-full flex justify-center items-center">
				<Loading />
			</div>
		);

	return (
		<div className="h-full bg-[#070F1C] text-white p-8 flex flex-col gap-8">
			<nav>
				<h1 className={`text-7xl text-white ${oswald.className}`}>
					Atualização: Parlamentar
				</h1>
			</nav>

			<AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
				<AlertDialogContent
					className={`bg-[#AFC4F9] text-[#1A326E] ${oswald.className}`}
				>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Parlamentar atualizado com sucesso
						</AlertDialogTitle>
						<AlertDialogAction className="hover:bg-[#1A326E] hover:text-[#AFC4F9] duration-500">
							OK
						</AlertDialogAction>
					</AlertDialogHeader>
				</AlertDialogContent>
			</AlertDialog>
			<AlertDialog open={showError} onOpenChange={setShowError}>
				<AlertDialogContent className="bg-red-600 text-white">
					<AlertDialogHeader>
						<AlertDialogTitle className={oswald.className}>
							{"Erro ao atualizar parlamentar"}
						</AlertDialogTitle>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogAction className="hover:bg-white hover:text-red-600 duration-500">
							Fechar
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<div className="max-w-7xl">
				{/* Seletor de político */}
				<div className="mb-8 flex items-center">
					<div className="relative w-80">
						<div
							className="border-2 border-[#91ADF4] rounded-t-lg bg-white p-2 cursor-pointer text-black"
							onClick={() => setIsOpenList((prev) => !prev)}
						>
							{selectedPolitico
								? selectedPolitico.nome
								: "Selecione um político..."}
						</div>
						{isOpenList && (
							<div className="absolute w-full bg-white text-black rounded-b-md z-10 rounded-lg">
								<input
									type="text"
									placeholder="Pesquisar..."
									className="w-full p-2 text-black"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
								<div className="max-h-40 overflow-y-auto">
									{filteredPoliticos.map((p: ResponsePoliticoDTO) => (
										<div
											key={p.id}
											className="p-2 hover:bg-gray-100 cursor-pointer text-black"
											onClick={() => {
												setSelectedPolitico(p);
												setIsOpenList(false);
												setSearchTerm("");
											}}
										>
											{p.nome} - {p.partido?.nome || ""}
										</div>
									))}
								</div>
							</div>
						)}
					</div>
					{selectedPolitico && (
						<Button
							variant="outline"
							className="h-8 w-8 rounded-se-xl rounded-es-xl hover:bg-red-600 duration-200 ml-2"
							onClick={() => {
								setSelectedPolitico(undefined);
								form.reset();
							}}
						>
							<FaTrash />
						</Button>
					)}
				</div>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8"
						encType="multipart/form-data"
					>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{/* Campos iguais ao cadastro */}
							<FormField
								control={form.control}
								name="nome"
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel className="text-white text-md md:text-xl before:content-['*'] before:text-[#F55B5B]">
											Nome:
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className={`bg-white text-black h-12 text-lg font-normal rounded-[5px] ${
													fieldState.error
														? "border-2 border-red-500 focus:border-red-500"
														: "border-0"
												}`}
												aria-invalid={fieldState.error ? "true" : "false"}
												aria-describedby={
													fieldState.error ? "nome-error" : undefined
												}
											/>
										</FormControl>
										{fieldState.error && (
											<FormMessage
												id="nome-error"
												className="text-red-500 text-sm mt-1"
											/>
										)}
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="genero"
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel className="text-white text-md md:text-xl before:content-['*'] before:text-[#F55B5B]">
											Gênero:
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className={`bg-white text-black h-12 text-lg font-normal rounded-[5px] ${
													fieldState.error
														? "border-2 border-red-500 focus:border-red-500"
														: "border-0"
												}`}
												aria-invalid={fieldState.error ? "true" : "false"}
												aria-describedby={
													fieldState.error ? "genero-error" : undefined
												}
											/>
										</FormControl>
										{fieldState.error && (
											<FormMessage
												id="genero-error"
												className="text-red-500 text-sm mt-1"
											/>
										)}
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="raca"
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel className="text-white text-md md:text-xl before:content-['*'] before:text-[#F55B5B]">
											Raça:
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className={`bg-white text-black h-12 text-lg font-normal rounded-[5px] ${
													fieldState.error
														? "border-2 border-red-500 focus:border-red-500"
														: "border-0"
												}`}
												aria-invalid={fieldState.error ? "true" : "false"}
												aria-describedby={
													fieldState.error ? "raca-error" : undefined
												}
											/>
										</FormControl>
										{fieldState.error && (
											<FormMessage
												id="raca-error"
												className="text-red-500 text-sm mt-1"
											/>
										)}
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="religiao"
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel className="text-white text-md md:text-xl before:content-['*'] before:text-[#F55B5B]">
											Religião:
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className={`bg-white text-black h-12 text-lg font-normal rounded-[5px] ${
													fieldState.error
														? "border-2 border-red-500 focus:border-red-500"
														: "border-0"
												}`}
												aria-invalid={fieldState.error ? "true" : "false"}
												aria-describedby={
													fieldState.error ? "religiao-error" : undefined
												}
											/>
										</FormControl>
										{fieldState.error && (
											<FormMessage
												id="religiao-error"
												className="text-red-500 text-sm mt-1"
											/>
										)}
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="ideologia"
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel className="text-white text-md md:text-xl before:content-['*'] before:text-[#F55B5B]">
											Ideologia Política:
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												value={field.value || ""}
												className={`bg-white text-black h-12 text-lg font-normal rounded-[5px] ${
													fieldState.error
														? "border-2 border-red-500 focus:border-red-500"
														: "border-0"
												}`}
												aria-invalid={fieldState.error ? "true" : "false"}
												aria-describedby={
													fieldState.error ? "ideologia-error" : undefined
												}
											/>
										</FormControl>
										{fieldState.error && (
											<FormMessage
												id="ideologia-error"
												className="text-red-500 text-sm mt-1"
											/>
										)}
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="partido"
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel className="text-white text-md md:text-xl before:content-['*'] before:text-[#F55B5B]">
											Partido:
										</FormLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger
													className={`bg-white text-black h-12 text-lg font-normal rounded-[5px] ${
														fieldState.error
															? "border-2 border-red-500 focus:border-red-500"
															: "border-0"
													}`}
												>
													<SelectValue placeholder="Nome do partido" />
												</SelectTrigger>
											</FormControl>
											<SelectContent className="max-h-60 overflow-y-auto bg-white">
												{partidos?.map((p) => (
													<SelectItem key={p.id} value={p.id}>
														{p.nome}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										{fieldState.error && (
											<FormMessage
												id="partido-error"
												className="text-red-500 text-sm mt-1"
											/>
										)}
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="estado"
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel className="text-white text-md md:text-xl before:content-['*'] before:text-[#F55B5B]">
											Estado:
										</FormLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger
													className={`bg-white text-black h-12 text-lg font-normal rounded-[5px] ${
														fieldState.error
															? "border-2 border-red-500 focus:border-red-500"
															: "border-0"
													}`}
												>
													<SelectValue placeholder="Nome do estado" />
												</SelectTrigger>
											</FormControl>
											<SelectContent className="max-h-60 overflow-y-auto bg-white">
												{estados?.map((e) => (
													<SelectItem key={e.id} value={e.id}>
														{e.nome}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										{fieldState.error && (
											<FormMessage
												id="estado-error"
												className="text-red-500 text-sm mt-1"
											/>
										)}
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="profissao"
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel className="text-white text-md md:text-xl before:content-['*'] before:text-[#F55B5B]">
											Profissão:
										</FormLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger
													className={`bg-white text-black h-12 text-lg font-normal rounded-[5px] ${
														fieldState.error
															? "border-2 border-red-500 focus:border-red-500"
															: "border-0"
													}`}
												>
													<SelectValue placeholder="Nome da profissão" />
												</SelectTrigger>
											</FormControl>
											<SelectContent className="max-h-60 overflow-y-auto bg-white">
												{profissoes?.map((p) => (
													<SelectItem key={p.id} value={p.id}>
														{p.nome}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										{fieldState.error && (
											<FormMessage
												id="profissao-error"
												className="text-red-500 text-sm mt-1"
											/>
										)}
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="projetos"
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel className="text-white text-md md:text-xl before:content-['*'] before:text-[#F55B5B]">
											Projetos:
										</FormLabel>
										<MultiSelectPopover
											options={(Array.isArray(projetos) ? projetos : []).map(
												(p) => ({
													value: p.id,
													label: p.numeroPl,
												})
											)}
											value={field.value}
											onChange={field.onChange}
											placeholder="Número do projeto"
											className={`bg-white text-black h-12 text-lg font-normal rounded-[5px] ${
												fieldState.error
													? "border-2 border-red-500 focus:border-red-500"
													: "border-0"
											}`}
										/>
										{fieldState.error && (
											<FormMessage
												id="projetos-error"
												className="text-red-500 text-sm mt-1"
											/>
										)}
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="esfera"
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel className="text-white text-md md:text-xl before:content-['*'] before:text-[#F55B5B]">
											Esfera:
										</FormLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger
													className={`bg-white text-black h-12 text-lg font-normal rounded-[5px] ${
														fieldState.error
															? "border-2 border-red-500 focus:border-red-500"
															: "border-0"
													}`}
												>
													<SelectValue placeholder="Esfera" />
												</SelectTrigger>
											</FormControl>
											<SelectContent className="max-h-60 overflow-y-auto bg-white">
												{esferas?.map((e) => (
													<SelectItem key={e.id} value={e.id}>
														{e.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										{fieldState.error && (
											<FormMessage
												id="esfera-error"
												className="text-red-500 text-sm mt-1"
											/>
										)}
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="foto"
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel className="text-white text-2xl before:content-['*'] before:text-[#F55B5B]">
											Link da imagem:
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className={`bg-white text-black h-12 text-xl font-normal rounded-[5px] ${
													fieldState.error
														? "border-2 border-red-500 focus:border-red-500"
														: "border-0"
												}`}
												type="text"
												aria-invalid={fieldState.error ? "true" : "false"}
												aria-describedby={
													fieldState.error ? "imagem-error" : undefined
												}
											/>
										</FormControl>
										{fieldState.error && (
											<FormMessage
												id="imagem-error"
												className="text-red-500 text-sm mt-1"
											/>
										)}
									</FormItem>
								)}
							/>
						</div>
						<div className="pt-4">
							<Button
								type="submit"
								disabled={
									isLoadingSelects || isUpdatingPolitico || !selectedPolitico
								}
								className="bg-[#122144] w-40 h-12 border-[#CDDBFF] border-2 text-lg md:text-2xl rounded-[3px] hover:bg-[#2C52A4] disabled:opacity-50 disabled:cursor-not-allowed duration-200 flex items-center justify-center"
							>
								Atualizar
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default Page;
