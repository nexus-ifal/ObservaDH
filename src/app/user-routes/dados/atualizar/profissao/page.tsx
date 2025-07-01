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

import { APIAtualizarProfissaoPayload } from "@/hooks/options/profissao";
import { useProfissao } from "@/hooks/profissao/use-profissao";
import { useProfissaoAtualizar } from "@/hooks/profissao/use-profissao-update";

const formSchema = z.object({
	nome: z.string().min(1, { message: "Entrada obrigatória!" }),
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
const ProfissaoDialog: React.FC<DialogProps> = ({
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
	const { profissoes, isLoadingProfissoes } = useProfissao();
	const {
		atualizarProfissao,
		isUpdatingProfissao,
		hasAtualizarProfissaoError,
		hasAtualizarProfissaoSuccess,
	} = useProfissaoAtualizar();
	interface Profissao {
		id: string;
		nome: string;
	}
	const [selectedProfissao, setSelectedProfissao] = useState<Profissao | null>(
		null
	);
	const [isOpenList, setIsOpenList] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [showSuccess, setShowSuccess] = useState(false);
	const [showError, setShowError] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { nome: "" },
	});

	useEffect(() => {
		if (hasAtualizarProfissaoSuccess) {
			setShowSuccess(true);
			form.reset({ nome: "" });
			setSelectedProfissao(null);
			setTimeout(() => setShowSuccess(false), 4000);
		}
	}, [hasAtualizarProfissaoSuccess, form]);

	useEffect(() => {
		if (hasAtualizarProfissaoError) {
			setShowError(true);
			setTimeout(() => setShowError(false), 4000);
		}
	}, [hasAtualizarProfissaoError]);

	const filteredProfissoes = useMemo(() => {
		if (!profissoes) return [];
		if (!searchTerm) return profissoes;
		return profissoes.filter((e) =>
			e.nome.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [profissoes, searchTerm]);

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		if (!selectedProfissao) return;
		const payload: APIAtualizarProfissaoPayload = {
			id: selectedProfissao.id,
			data: { ...values, id: selectedProfissao.id },
		};
		atualizarProfissao({ payload });
	};

	if (isLoadingProfissoes)
		return (
			<div className="flex h-full w-full justify-center items-center">
				<ScaleLoader color="#CDDBFF" height={46} width={6} />
				<span className="ml-2">Carregando profissões...</span>
			</div>
		);

	return (
		<div className="flex flex-col gap-16 overflow-auto h-full p-8">
			<h1 className="text-7xl font-normal">Atualização: Profissão</h1>
			<div className="flex items-center gap-4">
				<div className="relative w-80">
					<div
						className="border-2 border-[#91ADF4] rounded-t-lg bg-white p-2 cursor-pointer text-black"
						onClick={() => setIsOpenList((prev) => !prev)}
					>
						{selectedProfissao?.nome ?? "Selecione uma profissão..."}
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
								{filteredProfissoes.map((e) => (
									<div
										key={e.id}
										className="p-2 hover:bg-gray-100 cursor-pointer text-black"
										onClick={() => {
											setSelectedProfissao(e);
											setIsOpenList(false);
											form.setValue("nome", e.nome);
										}}
									>
										{e.nome}
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				{selectedProfissao && (
					<Button
						variant="outline"
						className="h-8 w-8 rounded-se-xl rounded-es-xl hover:bg-red-600 duration-200"
						onClick={() => {
							setSelectedProfissao(null);
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
												className={`${fieldState.error ? "border-2 border-red-500" : "border-2 border-[#91ADF4]"} bg-white text-black h-12 text-xl rounded-[5px]`}
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
							{/* sigla removido */}
						</div>

						<div className="mt-4">
							<Button
								type="submit"
								disabled={!selectedProfissao}
								className="bg-[#122144] w-1/4 min-w-[200px] h-14 border-2 border-[#CDDBFF] text-2xl rounded-[3px] hover:bg-[#2C52A4] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
							>
								{isUpdatingProfissao ? (
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

			<ProfissaoDialog
				open={showSuccess}
				onOpenChange={setShowSuccess}
				title="Profissão atualizada com sucesso"
			/>
			<ProfissaoDialog
				open={showError}
				onOpenChange={setShowError}
				title="Erro ao atualizar profissão"
				type="error"
			/>
		</div>
	);
};

export default Page;
