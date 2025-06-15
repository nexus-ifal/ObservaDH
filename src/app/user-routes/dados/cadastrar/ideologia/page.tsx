"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ScaleLoader from "react-spinners/ScaleLoader";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogFooter,
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
import { Textarea } from "@/components/ui-shacnui/textarea";

import { oswald } from "@/core/lib/fonts/fonts";
import { useIdeologiaCreate } from "@/infra/hooks/ideologia/use-ideologia-create";

const formSchema = z.object({
	nome: z.string().min(1, {
		message: "Entrada obrigatória!",
	}),
	sigla: z.string().min(1, {
		message: "Entrada obrigatória!",
	}),
	descricao: z.string().min(1, {
		message: "Entrada obrigatória!",
	}),
});

const Page: React.FC = () => {
	const { createIdeologia, isLoading, isSuccess, error } = useIdeologiaCreate();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nome: "",
			sigla: "",
			descricao: "",
		},
	});

	const [showSuccess, setShowSuccess] = useState(false);
	const [showError, setShowError] = useState(false);

	useEffect(() => {
		if (isSuccess) {
			setShowSuccess(true);
			form.reset({ nome: "", sigla: "", descricao: "" });
			const timeout = setTimeout(() => setShowSuccess(false), 4000);
			return () => clearTimeout(timeout);
		}
	}, [isSuccess, form]);

	useEffect(() => {
		if (error) {
			setShowError(true);
			const timeout = setTimeout(() => setShowError(false), 4000);
			return () => clearTimeout(timeout);
		}
	}, [error]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		createIdeologia({
			nome: values.nome,
			sigla: values.sigla,
			descricao: values.descricao || "sem descrição",
		});
	}

	return (
		<div className="text-white p-8 flex flex-col gap-8">
			<nav>
				<h1 className={`text-7xl text-white ${oswald.className}`}>
					Cadastro: Ideologia
				</h1>
			</nav>

			<AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
				<AlertDialogContent
					className={`bg-[#AFC4F9] text-[#1A326E] ${oswald.className}`}
				>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Ideologia cadastrada com sucesso
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
								: error?.message || "Erro ao cadastrar ideologia"}
						</AlertDialogTitle>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogAction className="hover:bg-white hover:text-red-600 duration-500">
							Fechar
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full flex flex-col gap-6"
					>
						<div className="grid grid-cols-2 gap-8">
							<FormField
								control={form.control}
								name="nome"
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel className="text-white text-2xl before:content-['*'] before:text-[#F55B5B]">
											Nome:
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className={`bg-white text-black h-12 w-full text-xl font-normal rounded-[5px] ${
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
								name="sigla"
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel className="text-white text-2xl before:content-['*'] before:text-[#F55B5B]">
											Sigla:
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className={`bg-white text-black h-12 w-full text-xl font-normal rounded-[5px] ${
													fieldState.error
														? "border-2 border-red-500 focus:border-red-500"
														: "border-0"
												}`}
												aria-invalid={fieldState.error ? "true" : "false"}
												aria-describedby={
													fieldState.error ? "sigla-error" : undefined
												}
											/>
										</FormControl>
										{fieldState.error && (
											<FormMessage
												id="sigla-error"
												className="text-red-500 text-sm mt-1"
											/>
										)}
									</FormItem>
								)}
							/>
						</div>
						<div className="grid grid-cols-2 gap-8">
							<div>
								<FormField
									control={form.control}
									name="descricao"
									render={({ field, fieldState }) => (
										<FormItem className="h-full flex flex-col">
											<FormLabel className="text-white text-2xl">
												Descrição:
											</FormLabel>
											<FormControl>
												<Textarea
													{...field}
													rows={8}
													className="bg-white text-black w-full text-xl font-normal rounded-[5px] border-0 resize-y h-full min-h-[140px] max-h-80 overflow-auto"
													placeholder="Digite uma descrição para a ideologia (opcional)"
												/>
											</FormControl>
											{fieldState.error && (
												<FormMessage className="text-red-500 text-sm mt-1" />
											)}
										</FormItem>
									)}
								/>
							</div>
							<div className="flex items-end h-full">
								<Button
									type="submit"
									disabled={isLoading}
									className="bg-[#122144] w-1/3 h-16 border-[#CDDBFF] border-2 text-2xl rounded-[3px] hover:bg-[#2C52A4] disabled:opacity-50 disabled:cursor-not-allowed duration-200 flex items-center justify-center"
								>
									{isLoading ? (
										<>
											<ScaleLoader color="#CDDBFF" height={20} />
											<span className="ml-2">Cadastrando...</span>
										</>
									) : (
										"Cadastrar"
									)}
								</Button>
							</div>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default Page;
