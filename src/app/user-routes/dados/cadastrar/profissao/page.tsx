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

import { oswald } from "../../../../../fonts/fonts";

import { useProfissaoCreate } from "@/hooks/profissao/use-profissao-create";

const formSchema = z.object({
	nome: z.string().min(1, {
		message: "Entrada obrigatória!",
	}),
});

const Page: React.FC = () => {
	const { createProfissao, isLoading, isSucess, error } = useProfissaoCreate();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nome: "",
		},
	});

	const [showSuccess, setShowSuccess] = useState(false);
	const [showError, setShowError] = useState(false);

	useEffect(() => {
		if (isSucess) {
			setShowSuccess(true);
			form.reset({ nome: "" });
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
		createProfissao({ nome: values.nome });
	}

	return (
		<div className="text-white p-8 flex flex-col gap-8">
			<nav>
				<h1 className={`text-7xl text-white ${oswald.className}`}>
					Cadastro: Profissão
				</h1>
			</nav>

			<AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
				<AlertDialogContent
					className={`bg-[#AFC4F9] text-[#1A326E] ${oswald.className}`}
				>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Profissão cadastrada com sucesso
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
								: error?.message || "Erro ao cadastrar profissão"}
						</AlertDialogTitle>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogAction className="hover:bg-white hover:text-red-600 duration-500">
							Fechar
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<div className="">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="gap-12 flex items-end w-full"
					>
						<div className="grid grid-cols-1 gap-6 w-1/4">
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
												className={`bg-white text-black h-12 w-full text-xl font-normal rounded-sm ${
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
						</div>

						<div>
							<Button
								type="submit"
								disabled={isLoading}
								className="bg-[#122144] w-full h-12 border-[#CDDBFF] border-2 text-2xl rounded-[3px] hover:bg-[#2C52A4] disabled:opacity-50 disabled:cursor-not-allowed duration-200 flex items-center justify-center"
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
					</form>
				</Form>
			</div>
		</div>
	);
};

export default Page;
