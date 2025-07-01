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
import { Textarea } from "@/components/external/ui-shacnui/textarea";
import { MultiSelectPopover } from "@/components/ui/dropdown/MultiSelectPopover";

import Loading from "../../../../../components/ui/loading";
import { oswald } from "../../../../../fonts/fonts";

import { useDireitoViolado } from "@/infra/hooks/direito-violado/use-direito-violado";
import { useIdeologia } from "@/infra/hooks/ideologia/use-ideologia";
import { usePauta } from "@/infra/hooks/pauta/use-pauta";
import { usePolitico } from "@/infra/hooks/politico/use-politico";
import { useProjetoCreate } from "@/infra/hooks/projeto/use-projeto-create";

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

const Page: React.FC = () => {
	const { pautas, isLoadingPautas } = usePauta();
	const { politicos, isLoadingPoliticos } = usePolitico();
	const { ideologias, isLoadingIdeologias } = useIdeologia();
	const { direitosViolados, isLoadingDireitosViolados } = useDireitoViolado();

	const { createProjeto, isLoading, isSucess, error } = useProjetoCreate();

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

	const [showSuccess, setShowSuccess] = useState(false);
	const [showError, setShowError] = useState(false);

	const isLoadingSelects =
		isLoadingPautas ||
		isLoadingIdeologias ||
		isLoadingPoliticos ||
		isLoadingDireitosViolados;

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
		createProjeto({
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
				<h1 className={`text-5xl text-white ${oswald.className}`}>
					Cadastro: PL
				</h1>
			</nav>

			<AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
				<AlertDialogContent
					className={`bg-[#AFC4F9] text-[#1A326E] ${oswald.className}`}
				>
					<AlertDialogHeader>
						<AlertDialogTitle>PL cadastrado com sucesso</AlertDialogTitle>
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
									: error || "Erro ao cadastrar PL"}
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
