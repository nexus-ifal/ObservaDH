"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ScaleLoader } from "react-spinners";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaTrash } from "react-icons/fa6";

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

import { oswald } from "@/core/lib/fonts/fonts";
import { usePartido } from "@/infra/hooks/partido/use-partido";
import { usePartidoAtualizar } from "@/infra/hooks/partido/use-partido-update";

const formSchema = z.object({
	nome: z.string().min(1, { message: "Entrada obrigatória!" }),
	sigla: z
		.string()
		.min(2, {
			message: "Sigla deve ter no mínimo 2 caracteres.",
		})
		.regex(/^[A-Z]+$/, {
			message: "Sigla deve conter apenas letras maiúsculas.",
		}),
	imagem: z.string().url({ message: "URL inválida!" }),
});

const PartidoDialog = ({
	open,
	onOpenChange,
	title,
	type = "info",
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	type?: "info" | "error";
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
					OK
				</AlertDialogAction>
			</AlertDialogHeader>
		</AlertDialogContent>
	</AlertDialog>
);

const Page: React.FC = () => {
	const { partidos, isLoadingPartidos } = usePartido();

	const {
		atualizarPartido,
		isUpdatingPartido,
		hasAtualizarPartidoError,
		hasAtualizarPartidoSucess,
	} = usePartidoAtualizar();

	const [selectedPartido, setSelectedPartido] = useState<any>(null);
	const [isOpenList, setIsOpenList] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [showSuccess, setShowSuccess] = useState(false);
	const [showError, setShowError] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nome: "",
			sigla: "",
			imagem: "",
		},
	});

	// Preenche o form ao selecionar partido
	useEffect(() => {
		if (selectedPartido) {
			form.setValue("nome", selectedPartido.nome);
			form.setValue("sigla", selectedPartido.sigla);
			form.setValue("imagem", selectedPartido.imagem);
		}
	}, [selectedPartido, form]);

	useEffect(() => {
		if (hasAtualizarPartidoSucess) {
			setShowSuccess(true);
			setTimeout(() => setShowSuccess(false), 4000);
		}
	}, [hasAtualizarPartidoSucess]);

	useEffect(() => {
		if (hasAtualizarPartidoError) {
			setShowError(true);
			setTimeout(() => setShowError(false), 4000);
		}
	}, [hasAtualizarPartidoError]);

	const filteredPartidos = useMemo(() => {
		if (!partidos) return [];
		if (!searchTerm) return partidos;
		return partidos.filter((e: any) =>
			e.nome.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [partidos, searchTerm]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		if (!selectedPartido) return;
		atualizarPartido({
			payload: {
				data: {
					...values,
					id: selectedPartido.id,
				},
				id: selectedPartido.id,
			},
		});
	}

	if (isLoadingPartidos)
		return (
			<div className="flex h-full w-full justify-center items-center">
				<ScaleLoader color="#CDDBFF" height={46} width={6} />
				<span className="ml-2">Carregando partidos...</span>
			</div>
		);

	return (
		<div className="flex flex-col gap-16 overflow-auto h-full p-8 text-white">
			<h1 className={`text-7xl font-normal ${oswald.className}`}>
				Atualização: Partido
			</h1>
			<div className="flex items-center gap-4">
				<div className="relative w-80">
					<div
						className="border-2 border-[#91ADF4] rounded-t-lg bg-white p-2 cursor-pointer text-black"
						onClick={() => setIsOpenList((prev) => !prev)}
					>
						{selectedPartido?.nome ?? "Selecione um partido..."}
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
								{filteredPartidos.map((e: any) => (
									<div
										key={e.id}
										className="p-2 hover:bg-gray-100 cursor-pointer text-black"
										onClick={() => {
											setSelectedPartido(e);
											setIsOpenList(false);
										}}
									>
										{e.nome}
									</div>
								))}
							</div>
						</div>
					)}
				</div>
				{selectedPartido && (
					<Button
						variant="outline"
						className="h-8 w-8 rounded-se-xl rounded-es-xl hover:bg-red-600 duration-200"
						onClick={() => {
							setSelectedPartido(null);
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
												className={`bg-white text-black h-12 text-xl font-normal rounded-[5px] ${fieldState.error ? "border-2 border-red-500" : "border-0"}`}
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
												className={`bg-white text-black h-12 uppercase text-xl font-normal rounded-[5px] ${fieldState.error ? "border-2 border-red-500" : "border-0"}`}
												type="text"
												onChange={(e) =>
													field.onChange(e.target.value.toUpperCase())
												}
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
						<div>
							<FormField
								name="imagem"
								control={form.control}
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel className="text-white text-2xl before:content-['*'] before:text-[#F55B5B]">
											Link da imagem:
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className={`bg-white text-black h-12 text-xl font-normal rounded-[5px] ${fieldState.error ? "border-2 border-red-500" : "border-0"}`}
												type="url"
												aria-invalid={!!fieldState.error}
												aria-describedby={
													fieldState.error ? "imagem-error" : undefined
												}
											/>
										</FormControl>
										<FormMessage
											id="imagem-error"
											className="text-red-500 text-sm mt-1"
										/>
									</FormItem>
								)}
							/>
						</div>
						<div className="pt-4">
							<Button
								type="submit"
								disabled={!selectedPartido || isUpdatingPartido}
								className="bg-[#122144] w-1/4 min-w-[200px] h-14 border-[#CDDBFF] border-2 text-2xl rounded-[3px] hover:bg-[#2C52A4] disabled:opacity-50 disabled:cursor-not-allowed duration-200 flex items-center justify-center"
							>
								{isUpdatingPartido ? (
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
			<PartidoDialog
				open={showSuccess}
				onOpenChange={setShowSuccess}
				title="Partido atualizado com sucesso"
			/>
			<PartidoDialog
				open={showError}
				onOpenChange={setShowError}
				title="Erro ao atualizar partido"
				type="error"
			/>
		</div>
	);
};

export default Page;
