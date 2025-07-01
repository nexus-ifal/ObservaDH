"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa6";
import { ScaleLoader } from "react-spinners";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
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
import { Textarea } from "@/components/external/ui-shacnui/textarea";

import { oswald } from "../../../../../fonts/fonts";

import { ResponseIdeologiaDTO } from "@/core/domain/dtos/ideologia.dto";
import { useIdeologia } from "@/hooks/ideologia/use-ideologia";
import { useIdeologiaAtualizar } from "@/hooks/ideologia/use-ideologia-update";
import { APIAtualizarIdeologiaPayload } from "@/hooks/options/ideologia";

const formSchema = z.object({
	nome: z.string().min(1, { message: "Entrada obrigatória!" }),
	sigla: z.string().min(1, { message: "Entrada obrigatória!" }),
	descricao: z.string().min(1, { message: "Entrada obrigatória!" }),
});

interface DialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	confirmLabel?: string;
	type?: "info" | "error";
}
const IdeologiaDialog: React.FC<DialogProps> = ({
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
	const { ideologias, isLoadingIdeologias } = useIdeologia();
	const {
		atualizarIdeologia,
		hasAtualizarIdeologiaError,
		hasAtualizarIdeologiaSuccess,
		isUpdatingIdeologia,
	} = useIdeologiaAtualizar();

	const [selectedIdeologia, setSelectedIdeologia] =
		useState<ResponseIdeologiaDTO | null>(null);
	const [isOpenList, setIsOpenList] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [showSuccess, setShowSuccess] = useState(false);
	const [showError, setShowError] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { nome: "", sigla: "", descricao: "" },
	});

	useEffect(() => {
		if (hasAtualizarIdeologiaSuccess) {
			setShowSuccess(true);
			form.reset({ nome: "", sigla: "", descricao: "" });
			setSelectedIdeologia(null);
			const timeout = setTimeout(() => setShowSuccess(false), 4000);
			return () => clearTimeout(timeout);
		}
	}, [hasAtualizarIdeologiaSuccess, form]);

	useEffect(() => {
		if (hasAtualizarIdeologiaError) {
			setShowError(true);
			const timeout = setTimeout(() => setShowError(false), 4000);
			return () => clearTimeout(timeout);
		}
	}, [hasAtualizarIdeologiaError]);

	const filteredIdeologias = useMemo(() => {
		if (!ideologias) return [];
		if (!searchTerm) return ideologias;
		return ideologias.filter((d: ResponseIdeologiaDTO) =>
			d.nome.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [ideologias, searchTerm]);

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		if (!selectedIdeologia) return;
		const payload: APIAtualizarIdeologiaPayload = {
			id: selectedIdeologia.id,
			data: { ...values, id: selectedIdeologia.id },
		};
		atualizarIdeologia({ payload });
	};

	if (isLoadingIdeologias)
		return (
			<div className="flex h-full w-full justify-center items-center">
				<ScaleLoader color="#CDDBFF" height={46} width={6} />
				<span className="ml-2">Carregando ideologias...</span>
			</div>
		);

	return (
		<div className="flex flex-col gap-16 overflow-auto h-full p-8 text-white">
			<h1 className={`text-7xl font-normal ${oswald.className}`}>
				Atualização: Ideologia
			</h1>
			<div className="flex items-center gap-4">
				<div className="relative w-80">
					<div
						className="border-2 border-[#91ADF4] rounded-t-lg bg-white p-2 cursor-pointer text-black"
						onClick={() => setIsOpenList((prev) => !prev)}
					>
						{selectedIdeologia?.nome ?? "Selecione uma ideologia..."}
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
								{filteredIdeologias.map((d: ResponseIdeologiaDTO) => (
									<div
										key={d.id}
										className="p-2 hover:bg-gray-100 cursor-pointer text-black"
										onClick={() => {
											setSelectedIdeologia(d);
											setIsOpenList(false);
											form.setValue("nome", d.nome);
											form.setValue("sigla", d.sigla);
											form.setValue("descricao", d.descricao);
										}}
									>
										{d.nome}
									</div>
								))}
							</div>
						</div>
					)}
				</div>
				{selectedIdeologia && (
					<Button
						variant="outline"
						className="h-8 w-8 rounded-se-xl rounded-es-xl hover:bg-red-600 duration-200"
						onClick={() => {
							setSelectedIdeologia(null);
							form.reset();
						}}
					>
						<FaTrash />
					</Button>
				)}
			</div>
			<div className="max-w-3xl">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-16"
					>
						{/* Primeira linha: nome e sigla */}
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
														: "border-2 border-[#91ADF4]"
												}`}
												aria-invalid={fieldState.error ? "true" : "false"}
												aria-describedby={
													fieldState.error ? "nome-error" : undefined
												}
											/>
										</FormControl>
										<FormMessage
											id="nome-error"
											className="text-red-500 text-sm mt-1"
										/>
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
												className={`bg-white text-black h-12 w-full text-xl font-normal rounded-[5px] uppercase ${
													fieldState.error
														? "border-2 border-red-500 focus:border-red-500"
														: "border-2 border-[#91ADF4]"
												}`}
												aria-invalid={fieldState.error ? "true" : "false"}
												aria-describedby={
													fieldState.error ? "sigla-error" : undefined
												}
												onChange={(e) =>
													field.onChange(e.target.value.toUpperCase())
												}
											/>
										</FormControl>
										<FormMessage
											id="sigla-error"
											className="text-red-500 text-sm mt-1"
										/>
									</FormItem>
								)}
							/>
						</div>
						{/* Segunda linha: descrição e botão */}
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
													className="bg-white text-black w-full text-xl font-normal rounded-[5px] border-2 border-[#91ADF4] resize-y h-full min-h-[140px] max-h-80 overflow-auto"
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
									disabled={!selectedIdeologia || isUpdatingIdeologia}
									className="bg-[#122144] w-1/3 h-16 border-[#CDDBFF] border-2 text-2xl rounded-[3px] hover:bg-[#2C52A4] disabled:opacity-50 disabled:cursor-not-allowed duration-200 flex items-center justify-center"
								>
									{isUpdatingIdeologia ? (
										<>
											<ScaleLoader color="#CDDBFF" height={20} />
											<span className="ml-2">Atualizando...</span>
										</>
									) : (
										"Atualizar"
									)}
								</Button>
							</div>
						</div>
					</form>
				</Form>
			</div>
			<IdeologiaDialog
				open={showSuccess}
				onOpenChange={setShowSuccess}
				title="Ideologia atualizada com sucesso"
			/>
			<IdeologiaDialog
				open={showError}
				onOpenChange={setShowError}
				title={
					typeof hasAtualizarIdeologiaError === "string"
						? hasAtualizarIdeologiaError
						: typeof hasAtualizarIdeologiaError === "object" &&
							  "message" in hasAtualizarIdeologiaError
							? hasAtualizarIdeologiaError
							: "Erro ao atualizar ideologia"
				}
				type="error"
			/>
		</div>
	);
};

export default Page;
