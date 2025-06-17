"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa6";
import { ScaleLoader } from "react-spinners";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { MultiSelectPopover } from "@/components/ui/dropdown/MultiSelectPopover";
import Loading from "@/components/ui/loading";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui-shacnui/alert-dialog";
import { Button } from "@/components/ui-shacnui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui-shacnui/form";
import { Input } from "@/components/ui-shacnui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui-shacnui/select";
import { Textarea } from "@/components/ui-shacnui/textarea";

import { ResponseProjetoDTO } from "@/core/domain/dtos/projeto.dto";
import { oswald } from "@/core/lib/fonts/fonts";
import { useDireitoViolado } from "@/infra/hooks/direito-violado/use-direito-violado";
import { useIdeologia } from "@/infra/hooks/ideologia/use-ideologia";
import { usePauta } from "@/infra/hooks/pauta/use-pauta";
import { usePolitico } from "@/infra/hooks/politico/use-politico";
import { useProjeto } from "@/infra/hooks/projeto/use-projeto";
import { useProjetoAtualizar } from "@/infra/hooks/projeto/use-projeto-update";
import { APIAtualizarProjetoPayload } from "@/infra/options/projeto";

const formSchema = z.object({
	ano: z
		.string()
		.min(1, { message: "Ano obrigatório" })
		.max(4, { message: "Ano deve ter no máximo 4 dígitos" }),
	numero: z.string().min(1, { message: "Número obrigatório" }),
	pauta: z.string().min(1, { message: "Pauta obrigatória" }),
	esfera: z.string().min(1, { message: "Esfera obrigatória" }),
	ideologias: z.string().min(1, { message: "Ideologia obrigatória" }),
	autores: z.string().min(1, { message: "Autores obrigatórios" }),
	direitosViolados: z.string().min(1, { message: "Campo obrigatório" }),
	ementa: z.string().min(1, { message: "Ementa obrigatória" }),
	justificativa: z.string().min(1, { message: "Justificativa obrigatória" }),
});

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

interface DialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	confirmLabel?: string;
	cancelLabel?: string;
	onConfirm?: () => void;
	type?: "info" | "error";
}

const ProjetoDialog: React.FC<DialogProps> = ({
	open,
	onOpenChange,
	title,
	confirmLabel = "OK",
	type = "info",
}) => (
	<AlertDialog open={open} onOpenChange={onOpenChange}>
		<AlertDialogContent
			className={
				type === "error"
					? "bg-red-600 text-white"
					: "bg-[#AFC4F9] text-[#1A326E] " + oswald.className
			}
		>
			<AlertDialogHeader>
				<AlertDialogTitle>{title}</AlertDialogTitle>
				<AlertDialogAction
					className={
						type === "error"
							? "hover:bg-white hover:text-red-600 duration-500"
							: "hover:bg-[#1A326E] hover:text-[#AFC4F9] duration-500"
					}
				>
					{confirmLabel}
				</AlertDialogAction>
			</AlertDialogHeader>
		</AlertDialogContent>
	</AlertDialog>
);

const Page: React.FC = () => {
	const { projetos, isLoadingProjetos } = useProjeto();

	const {
		atualizarProjeto,
		hasAtualizarProjetoSucess,
		hasAtualizarProjetoError,
		isUpdatingProjeto,
	} = useProjetoAtualizar();

	const { pautas, isLoadingPautas } = usePauta();
	const { politicos, isLoadingPoliticos } = usePolitico();
	const { ideologias, isLoadingIdeologias } = useIdeologia();
	const { direitosViolados, isLoadingDireitosViolados } = useDireitoViolado();

	const [selectedProjeto, setSelectedProjeto] = useState<ResponseProjetoDTO>();
	const [isOpenList, setIsOpenList] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [showSuccess, setShowSuccess] = useState(false);
	const [showError, setShowError] = useState(false);

	const isLoadingSelects =
		isLoadingPautas ||
		isLoadingIdeologias ||
		isLoadingPoliticos ||
		isLoadingDireitosViolados;

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			ano: "",
			numero: "",
			pauta: "",
			esfera: "",
			ideologias: "",
			autores: "",
			direitosViolados: "",
			ementa: "",
			justificativa: "",
		},
	});

	useEffect(() => {
		if (hasAtualizarProjetoSucess) {
			setShowSuccess(true);
			form.reset();
			setSelectedProjeto(undefined);
			const timeout = setTimeout(() => setShowSuccess(false), 4000);
			return () => clearTimeout(timeout);
		}
	}, [hasAtualizarProjetoSucess, form]);

	useEffect(() => {
		if (hasAtualizarProjetoError) {
			setShowError(true);
			const timeout = setTimeout(() => setShowError(false), 4000);
			return () => clearTimeout(timeout);
		}
	}, [hasAtualizarProjetoError]);

	// Preencher o formulário ao selecionar
	useEffect(() => {
		if (selectedProjeto) {
			form.setValue("ano", selectedProjeto.ano?.toString() || "");
			form.setValue("numero", selectedProjeto.numeroPl || "");
			form.setValue("pauta", selectedProjeto.pauta?.id || "");
			form.setValue("esfera", selectedProjeto.esfera?.id || "");
			form.setValue(
				"ideologias",
				selectedProjeto.ideologias?.map((i) => i.id).join(";") || ""
			);
			form.setValue(
				"autores",
				selectedProjeto.autores?.map((a) => a.id).join(";") || ""
			);
			form.setValue(
				"direitosViolados",
				selectedProjeto.direitosViolados?.map((d) => d.id).join(";") || ""
			);
			form.setValue("ementa", selectedProjeto.ementa || "");
			form.setValue("justificativa", selectedProjeto.justificativa || "");
		} else {
			form.reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedProjeto]);

	const filteredProjetos = useMemo(() => {
		if (!projetos) return [];
		if (!searchTerm) return projetos;
		return projetos.filter((p) =>
			p.numeroPl.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [projetos, searchTerm]);

	const handleProjetoSelect = (projeto: ResponseProjetoDTO) => {
		setSelectedProjeto(projeto);
		setIsOpenList(false);
		setSearchTerm("");
	};

	function onSubmit(values: z.infer<typeof formSchema>) {
		if (!selectedProjeto) return;
		const payload: APIAtualizarProjetoPayload = {
			id: selectedProjeto.id,
			data: {
				id: selectedProjeto.id,
				ano: values.ano,
				pautaId: values.pauta,
				ementa: values.ementa,
				esferaId: values.esfera,
				numeroPl: values.numero,
				justificativa: values.justificativa,
				autoresId: values.autores ? values.autores.split(";") : [],
				ideologiasId: values.ideologias ? values.ideologias.split(";") : [],
				direitosVioladosId: values.direitosViolados
					? values.direitosViolados.split(";")
					: [],
			},
		};
		atualizarProjeto({ payload });
	}

	if (isLoadingProjetos || isLoadingSelects)
		return (
			<div className="h-full flex justify-center items-center">
				<Loading />
			</div>
		);

	return (
		<div className="h-full bg-[#070F1C] text-white p-8 flex flex-col gap-8">
			<h1 className={`text-5xl text-white ${oswald.className}`}>
				Atualização: Projeto de Lei
			</h1>
			<div className="flex items-center gap-4">
				<div className="relative w-80">
					<div
						className="border-2 border-[#91ADF4] rounded-t-lg bg-white p-2 cursor-pointer text-black"
						onClick={() => setIsOpenList((prev) => !prev)}
					>
						{selectedProjeto
							? `${selectedProjeto.numeroPl}`
							: "Selecione um projeto de lei..."}
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
								{filteredProjetos.map((p) => (
									<div
										key={p.id}
										className="p-2 hover:bg-gray-100 cursor-pointer text-black"
										onClick={() => handleProjetoSelect(p)}
									>
										{p.numeroPl} - {p.esfera?.nome} - {p.pauta?.nome}
									</div>
								))}
							</div>
						</div>
					)}
				</div>
				{selectedProjeto && (
					<Button
						variant="outline"
						className="h-8 w-8 rounded-se-xl rounded-es-xl hover:bg-red-600 duration-200"
						onClick={() => {
							setSelectedProjeto(undefined);
							form.reset();
						}}
					>
						<FaTrash />
					</Button>
				)}
			</div>
			<div className="max-w-7xl">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<FormField
								control={form.control}
								name="ano"
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel className="text-white text-md md:text-xl before:content-['*'] before:text-[#F55B5B]">
											Ano:
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className={`bg-white text-black h-12 text-lg font-normal rounded-[5px] ${
													fieldState.error
														? "border-2 border-red-500 focus:border-red-500"
														: "border-0"
												}`}
												type="number"
												maxLength={4}
												aria-invalid={fieldState.error ? "true" : "false"}
												aria-describedby={
													fieldState.error ? "ano-error" : undefined
												}
											/>
										</FormControl>
										{fieldState.error && (
											<FormMessage
												id="ano-error"
												className="text-red-500 text-sm mt-1"
											/>
										)}
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="numero"
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel className="text-white text-md md:text-xl before:content-['*'] before:text-[#F55B5B]">
											Número do PL:
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
													fieldState.error ? "numero-error" : undefined
												}
											/>
										</FormControl>
										{fieldState.error && (
											<FormMessage
												id="numero-error"
												className="text-red-500 text-sm mt-1"
											/>
										)}
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="pauta"
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel className="text-white text-md md:text-xl before:content-['*'] before:text-[#F55B5B]">
											Pauta:
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
													<SelectValue placeholder="Nome da pauta" />
												</SelectTrigger>
											</FormControl>
											<SelectContent className="max-h-60 overflow-y-auto bg-white">
												{pautas?.map((p) => (
													<SelectItem key={p.id} value={p.id}>
														{p.nome}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										{fieldState.error && (
											<FormMessage
												id="pauta-error"
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
													<SelectValue placeholder="Nome da esfera" />
												</SelectTrigger>
											</FormControl>
											<SelectContent className="max-h-60 overflow-y-auto bg-white">
												{esferas.map((e) => (
													<SelectItem key={e.value} value={e.id}>
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
								name="ideologias"
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel className="text-white text-md md:text-xl before:content-['*'] before:text-[#F55B5B]">
											Ideologias:
										</FormLabel>
										<FormControl>
											<MultiSelectPopover
												options={
													ideologias?.map((i) => ({
														value: i.id,
														label: i.nome,
													})) ?? []
												}
												value={field.value ? field.value.split(";") : []}
												onChange={(vals) => field.onChange(vals.join(";"))}
												placeholder="Ideologias"
											/>
										</FormControl>
										{fieldState.error && (
											<FormMessage
												id="ideologias-error"
												className="text-red-500 text-sm mt-1"
											/>
										)}
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="autores"
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel className="text-white text-md md:text-xl before:content-['*'] before:text-[#F55B5B]">
											Autores:
										</FormLabel>
										<FormControl>
											<MultiSelectPopover
												options={
													politicos?.map((a) => ({
														value: a.id,
														label: a.nome,
													})) ?? []
												}
												value={field.value ? field.value.split(";") : []}
												onChange={(vals) => field.onChange(vals.join(";"))}
												placeholder="Parlamentares"
											/>
										</FormControl>
										{fieldState.error && (
											<FormMessage
												id="autores-error"
												className="text-red-500 text-sm mt-1"
											/>
										)}
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="direitosViolados"
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel className="text-white text-md md:text-xl before:content-['*'] before:text-[#F55B5B]">
											Direitos Violados
										</FormLabel>
										<FormControl>
											<MultiSelectPopover
												options={
													direitosViolados?.map((d) => ({
														value: d.id,
														label: d.nome,
													})) ?? []
												}
												value={field.value ? field.value.split(";") : []}
												onChange={(vals) => field.onChange(vals.join(";"))}
												placeholder="Direitos Violados"
											/>
										</FormControl>
										{fieldState.error && (
											<FormMessage
												id="direitosViolados-error"
												className="text-red-500 text-sm mt-1"
											/>
										)}
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="ementa"
								render={({ field, fieldState }) => (
									<FormItem className="col-span-1 md:col-span-1">
										<FormLabel className="text-white text-md md:text-xl before:content-['*'] before:text-[#F55B5B]">
											Ementa:
										</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												rows={5}
												className={`bg-white min-h-72 text-black text-lg font-normal rounded-[5px] resize-none ${
													fieldState.error
														? "border-2 border-red-500 focus:border-red-500"
														: "border-0"
												}`}
												aria-invalid={fieldState.error ? "true" : "false"}
												aria-describedby={
													fieldState.error ? "ementa-error" : undefined
												}
											/>
										</FormControl>
										{fieldState.error && (
											<FormMessage
												id="ementa-error"
												className="text-red-500 text-sm mt-1"
											/>
										)}
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="justificativa"
								render={({ field, fieldState }) => (
									<FormItem className="col-span-1 md:col-span-1">
										<FormLabel className="text-white text-md md:text-xl before:content-['*'] before:text-[#F55B5B]">
											Justificativa:
										</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												rows={5}
												className={`bg-white text-black min-h-72 text-lg font-normal rounded-[5px] resize-none ${
													fieldState.error
														? "border-2 border-red-500 focus:border-red-500"
														: "border-0"
												}`}
												aria-invalid={fieldState.error ? "true" : "false"}
												aria-describedby={
													fieldState.error ? "justificativa-error" : undefined
												}
											/>
										</FormControl>
										{fieldState.error && (
											<FormMessage
												id="justificativa-error"
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
								disabled={!selectedProjeto || isUpdatingProjeto}
								className="flex bg-[#122144] w-1/5 h-16 border-[#CDDBFF] border-2 text-lg md:text-2xl rounded-[3px] hover:bg-[#2C52A4] disabled:opacity-50 disabled:cursor-not-allowed duration-200 items-center justify-center"
							>
								{isUpdatingProjeto ? (
									<>
										<ScaleLoader color="#CDDBFF" height={20} />
										<span className="ml-2">Atualizando...</span>
									</>
								) : (
									"Atualizar"
								)}
							</Button>
						</div>
					</form>
				</Form>
			</div>
			<ProjetoDialog
				open={showSuccess}
				onOpenChange={setShowSuccess}
				title="Projeto de lei atualizado com sucesso"
			/>
			<ProjetoDialog
				open={showError}
				onOpenChange={setShowError}
				title="Erro ao atualizar projeto de lei"
				type="error"
			/>
		</div>
	);
};

export default Page;
