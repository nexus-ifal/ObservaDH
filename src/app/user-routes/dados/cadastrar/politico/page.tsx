"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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

import Loading from "../../../../../components/ui/loading";
import { oswald } from "../../../../../fonts/fonts";

import { useEstado } from "@/infra/hooks/estado/use-estado";
import { usePartido } from "@/infra/hooks/partido/use-partido";
import { usePoliticoCreate } from "@/infra/hooks/politico/use-politico-create";
import { useProfissao } from "@/infra/hooks/profissao/use-profissao";
import { useProjeto } from "@/infra/hooks/projeto/use-projeto";

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

const Page: React.FC = () => {
	const { profissoes, isLoadingProfissoes } = useProfissao();
	const { partidos, isLoadingPartidos } = usePartido();
	const { projetos, isLoadingProjetos } = useProjeto();
	const { estados, isLoadingEstados } = useEstado();

	const { createPolitico, isLoading, isSucess, error } = usePoliticoCreate();

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
			foto: undefined,
		},
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

	const [showSuccess, setShowSuccess] = useState(false);
	const [showError, setShowError] = useState(false);

	const isLoadingSelects =
		isLoadingProfissoes ||
		isLoadingPartidos ||
		isLoadingProjetos ||
		isLoadingEstados;

	useEffect(() => {
		if (isSucess) {
			setShowSuccess(true);
			form.reset();
			const timeout = setTimeout(() => setShowSuccess(false), 4000);
			return () => clearTimeout(timeout);
		}
	}, [isSucess, form]);

	useEffect(() => {
		if (error) {
			setShowError(true);
			const timeout = setTimeout(() => setShowError(false), 4000);
			return () => clearTimeout(timeout);
		}
	}, [error]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		function capitalizeFirst(str: string) {
			return str
				.trim()
				.toLowerCase()
				.replace(/^./, (c) => c.toUpperCase());
		}

		createPolitico({
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
			foto: values.foto[0],
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
					Cadastro: Parlamentar
				</h1>
			</nav>

			<AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
				<AlertDialogContent
					className={`bg-[#AFC4F9] text-[#1A326E] ${oswald.className}`}
				>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Parlamentar cadastrado com sucesso
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
							{typeof error === "string"
								? error
								: error instanceof Error
									? error.message
									: error || "Erro ao cadastrar parlamentar"}
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
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8"
						encType="multipart/form-data"
					>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
											options={
												projetos?.map((p) => ({
													value: p.id,
													label: p.numeroPl,
												})) ?? []
											}
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
								disabled={isLoading}
								className="bg-[#122144] w-40 h-12 border-[#CDDBFF] border-2 text-lg md:text-2xl rounded-[3px] hover:bg-[#2C52A4] disabled:opacity-50 disabled:cursor-not-allowed duration-200 flex items-center justify-center"
							>
								Cadastrar
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default Page;
