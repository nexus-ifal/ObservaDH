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

import { ResponseDireitoVioladoDTO } from "@/core/domain/dtos/direito-violado.dto";
import { APIAtualizarDireitoVioladoPayload } from "@/hooks/options/direito-violado";
import { useDireitoViolado } from "@/infra/hooks/direito-violado/use-direito-violado";
import { useDireitoVioladoAtualizar } from "@/infra/hooks/direito-violado/use-direito-violado-update";

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
const DireitoVioladoDialog: React.FC<DialogProps> = ({
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
	const { direitosViolados, isLoadingDireitosViolados } = useDireitoViolado();
	const {
		atualizarDireitoViolado,
		hasAtualizarDireitoVioladoError,
		hasAtualizarDireitoVioladoSucess,
		isUpdatingDireitoViolado,
	} = useDireitoVioladoAtualizar();

	const [selectedDireito, setSelectedDireito] =
		useState<ResponseDireitoVioladoDTO | null>(null);
	const [isOpenList, setIsOpenList] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [showSuccess, setShowSuccess] = useState(false);
	const [showError, setShowError] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { nome: "", sigla: "", descricao: "" },
	});

	useEffect(() => {
		if (hasAtualizarDireitoVioladoSucess) {
			setShowSuccess(true);
			form.reset({ nome: "", sigla: "", descricao: "" });
			setSelectedDireito(null);
			const timeout = setTimeout(() => setShowSuccess(false), 4000);
			return () => clearTimeout(timeout);
		}
	}, [hasAtualizarDireitoVioladoSucess, form]);

	useEffect(() => {
		if (hasAtualizarDireitoVioladoError) {
			setShowError(true);
			const timeout = setTimeout(() => setShowError(false), 4000);
			return () => clearTimeout(timeout);
		}
	}, [hasAtualizarDireitoVioladoError]);

	const filteredDireitos = useMemo(() => {
		if (!direitosViolados) return [];
		if (!searchTerm) return direitosViolados;
		return direitosViolados.filter((d: ResponseDireitoVioladoDTO) =>
			d.nome.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [direitosViolados, searchTerm]);

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		if (!selectedDireito) return;
		const payload: APIAtualizarDireitoVioladoPayload = {
			id: selectedDireito.id,
			data: { ...values, id: selectedDireito.id },
		};
		atualizarDireitoViolado({ payload });
	};

	if (isLoadingDireitosViolados)
		return (
			<div className="flex h-full w-full justify-center items-center">
				<ScaleLoader color="#CDDBFF" height={46} width={6} />
				<span className="ml-2">Carregando direitos violados...</span>
			</div>
		);

	return (
		<div className="flex flex-col gap-16 overflow-auto h-full p-8 text-white">
			<h1 className={`text-7xl font-normal ${oswald.className}`}>
				Atualização: Direito Violado
			</h1>
			<div className="flex items-center gap-4">
				<div className="relative w-80">
					<div
						className="border-2 border-[#91ADF4] rounded-t-lg bg-white p-2 cursor-pointer text-black"
						onClick={() => setIsOpenList((prev) => !prev)}
					>
						{selectedDireito?.nome ?? "Selecione um direito violado..."}
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
								{filteredDireitos.map((d: ResponseDireitoVioladoDTO) => (
									<div
										key={d.id}
										className="p-2 hover:bg-gray-100 cursor-pointer text-black"
										onClick={() => {
											setSelectedDireito(d);
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
				{selectedDireito && (
					<Button
						variant="outline"
						className="h-8 w-8 rounded-se-xl rounded-es-xl hover:bg-red-600 duration-200"
						onClick={() => {
							setSelectedDireito(null);
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
													placeholder="Digite uma descrição para o direito violado (opcional)"
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
									disabled={!selectedDireito || isUpdatingDireitoViolado}
									className="bg-[#122144] w-1/3 h-16 border-[#CDDBFF] border-2 text-2xl rounded-[3px] hover:bg-[#2C52A4] disabled:opacity-50 disabled:cursor-not-allowed duration-200 flex items-center justify-center"
								>
									{isUpdatingDireitoViolado ? (
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
			<DireitoVioladoDialog
				open={showSuccess}
				onOpenChange={setShowSuccess}
				title="Direito Violado atualizado com sucesso"
			/>
			<DireitoVioladoDialog
				open={showError}
				onOpenChange={setShowError}
				title={
					typeof hasAtualizarDireitoVioladoError === "string"
						? hasAtualizarDireitoVioladoError
						: typeof hasAtualizarDireitoVioladoError === "object" &&
							  "message" in hasAtualizarDireitoVioladoError
							? hasAtualizarDireitoVioladoError
							: "Erro ao atualizar direito violado"
				}
				type="error"
			/>
		</div>
	);
};

export default Page;
