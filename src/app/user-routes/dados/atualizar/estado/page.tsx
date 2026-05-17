"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa6";
import { ScaleLoader } from "react-spinners";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

import { oswald } from "../../../../../fonts/fonts";

import { useEstado } from "@/hooks/estado/use-estado";
import { useEstadoAtualizar } from "@/hooks/estado/use-estado-update";
import { APIAtualizarEstadoPayload } from "@/hooks/options/estado";

const formSchema = z.object({
	nome: z.string().min(1, { message: "Entrada obrigatória!" }),
	sigla: z
		.string()
		.min(2, { message: "Sigla deve ter no mínimo 2 caracteres." })
		.max(2, { message: "Sigla deve ter no máximo 2 caracteres." })
		.regex(/^[A-Z]{2}$/, {
			message: "Sigla deve conter apenas letras maiúsculas.",
		}),
});

interface DialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	confirmLabel?: string;
	cancelLabel?: string;
	onConfirm?: () => void;
	type?: "info" | "error";
}
const EstadoDialog: React.FC<DialogProps> = ({
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
	const { estados, isLoadingEstados } = useEstado();
	const {
		atualizarEstado,
		hasAtualizarEstadoSucess,
		hasAtualizarEstadoError,
		isUpdatingEstado,
	} = useEstadoAtualizar();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [selectedEstado, setSelectedEstado] = useState<any>(null);
	const [isOpenList, setIsOpenList] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [showSuccess, setShowSuccess] = useState(false);
	const [showError, setShowError] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { nome: "", sigla: "" },
	});

	useEffect(() => {
		if (hasAtualizarEstadoSucess) {
			setShowSuccess(true);
			form.reset({ nome: "", sigla: "" });
			setSelectedEstado(null);
			setTimeout(() => setShowSuccess(false), 4000);
		}
	}, [hasAtualizarEstadoSucess, form]);

	useEffect(() => {
		if (hasAtualizarEstadoError) {
			setShowError(true);
			setTimeout(() => setShowError(false), 4000);
		}
	}, [hasAtualizarEstadoError]);

	const filteredEstados = useMemo(() => {
		if (!estados) return [];
		if (!searchTerm) return estados;
		return estados.filter((e) =>
			e.nome.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [estados, searchTerm]);

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		if (!selectedEstado) return;
		const payload: APIAtualizarEstadoPayload = {
			id: selectedEstado.id,
			data: { ...values, id: selectedEstado.id },
		};
		atualizarEstado({ payload });
	};

	if (isLoadingEstados)
		return (
			<div className="flex h-full w-full justify-center items-center">
				<ScaleLoader color="#CDDBFF" height={46} width={6} />
				<span className="ml-2">Carregando estados...</span>
			</div>
		);

	return (
		<div className="flex flex-col gap-16 overflow-auto h-full p-8">
			<h1 className="text-7xl font-normal">Atualização: Estado</h1>
			<div className="flex items-center gap-4">
				<div className="relative w-80">
					<div
						className="border-2 border-[#91ADF4] rounded-t-lg bg-white p-2 cursor-pointer text-black"
						onClick={() => setIsOpenList((prev) => !prev)}
					>
						{selectedEstado?.nome ?? "Selecione um estado..."}
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
								{filteredEstados.map((e) => (
									<div
										key={e.id}
										className="p-2 hover:bg-gray-100 cursor-pointer text-black"
										onClick={() => {
											setSelectedEstado(e);
											setIsOpenList(false);
											form.setValue("nome", e.nome);
											form.setValue("sigla", e.sigla);
										}}
									>
										{e.nome}
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				{selectedEstado && (
					<Button
						variant="outline"
						className="h-8 w-8 rounded-se-xl rounded-es-xl hover:bg-red-600 duration-200"
						onClick={() => {
							setSelectedEstado(null);
							form.reset();
						}}
					>
						<FaTrash />
					</Button>
				)}
			</div>
			<div className="max-w-2xl">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-16"
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<FormField
								name="nome"
								control={form.control}
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel className="text-white text-2xl before:content-['*'] before:text-[#F55B5B]">
											Nome:
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className={`${fieldState.error ? "border-2 border-red-500" : "border-2 border-[#91ADF4]"} bg-white text-black h-12 text-xl rounded-sm`}
												aria-invalid={!!fieldState.error}
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
								name="sigla"
								control={form.control}
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel className="text-white text-2xl before:content-['*'] before:text-[#F55B5B]">
											Sigla:
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												maxLength={2}
												onChange={(e) =>
													field.onChange(e.target.value.toUpperCase())
												}
												className={`${fieldState.error ? "border-2 border-red-500" : "border-2 border-[#91ADF4]"} bg-white text-black h-12 uppercase text-xl rounded-sm`}
												aria-invalid={!!fieldState.error}
												aria-describedby={
													fieldState.error ? "sigla-error" : undefined
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

						<div className="mt-4">
							<Button
								type="submit"
								disabled={!selectedEstado}
								className="bg-[#122144] w-1/4 min-w-[200px] h-14 border-2 border-[#CDDBFF] text-2xl rounded-[3px] hover:bg-[#2C52A4] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
							>
								{isUpdatingEstado ? (
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

			<EstadoDialog
				open={showSuccess}
				onOpenChange={setShowSuccess}
				title="Estado atualizado com sucesso"
			/>
			<EstadoDialog
				open={showError}
				onOpenChange={setShowError}
				title="Erro ao atualizar estado"
				type="error"
			/>
		</div>
	);
};

export default Page;
