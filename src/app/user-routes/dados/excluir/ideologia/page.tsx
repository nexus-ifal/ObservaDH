"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ScaleLoader } from "react-spinners";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/external/ui-shacnui/alert-dialog";

import { oswald, titilliumWeb } from "../../../../../fonts/fonts";

import { ResponseIdeologiaDTO } from "@/core/domain/dtos/ideologia.dto";
import { useIdeologia } from "@/hooks/ideologia/use-ideologia";
import { useIdeologiaExcluir } from "@/hooks/ideologia/use-ideologia-delete";
import { APIExcluirIdeologiaPayload } from "@/hooks/options/ideologia";

const deleteSchema = z.object({
	ideologiaId: z.string().min(1, "Selecione uma ideologia"),
});

type DeleteFormData = z.infer<typeof deleteSchema>;

const Page: React.FC = () => {
	const { ideologias, isLoadingIdeologias } = useIdeologia();
	const {
		excluirIdeologia,
		isDeletingIdeologia,
		hasExcluirIdeologiaError,
		hasExcluirIdeologiaSuccess,
	} = useIdeologiaExcluir();

	const [selectedIdeologia, setSelectedIdeologia] =
		useState<ResponseIdeologiaDTO | null>(null);
	const [isOpenList, setIsOpenList] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [showSuccess, setShowSuccess] = useState(false);
	const [showError, setShowError] = useState(false);

	const {
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<DeleteFormData>({
		resolver: zodResolver(deleteSchema),
	});

	const filteredIdeologias = useMemo(() => {
		if (!ideologias) return [];
		if (!searchTerm) return ideologias;
		return ideologias.filter((d: ResponseIdeologiaDTO) =>
			d.nome.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [ideologias, searchTerm]);

	const onSubmit = () => {
		if (!selectedIdeologia) return;
		const payload: APIExcluirIdeologiaPayload = {
			id: selectedIdeologia.id,
		};
		excluirIdeologia({ payload });
	};

	const handleIdeologiaSelect = (ideologia: ResponseIdeologiaDTO) => {
		setSelectedIdeologia(ideologia);
		setValue("ideologiaId", ideologia.id);
		setIsOpenList(false);
		setSearchTerm("");
	};

	useEffect(() => {
		let successTimeout: NodeJS.Timeout | null = null;
		let errorTimeout: NodeJS.Timeout | null = null;

		if (hasExcluirIdeologiaSuccess) {
			setSelectedIdeologia(null);
			setShowSuccess(true);
			successTimeout = setTimeout(() => setShowSuccess(false), 4000);
		}
		if (hasExcluirIdeologiaError) {
			setShowError(true);
			errorTimeout = setTimeout(() => setShowError(false), 4000);
		}

		return () => {
			if (successTimeout) clearTimeout(successTimeout);
			if (errorTimeout) clearTimeout(errorTimeout);
		};
	}, [hasExcluirIdeologiaSuccess, hasExcluirIdeologiaError]);

	return (
		<div className="flex flex-col gap-14">
			<h1 className={`text-7xl ${oswald.className}`}>Exclusão: Ideologia</h1>
			{isLoadingIdeologias ? (
				<div className="h-full w-full justify-center items-center text-white">
					<ScaleLoader color="#CDDBFF" />
				</div>
			) : (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-row gap-6 items-end"
				>
					<div className={`${titilliumWeb.className} text-2xl`}>
						Ideologias
						<div className="relative w-80 mt-2">
							<div
								className="border-2 border-[#91ADF4] rounded-t-lg bg-white p-2 cursor-pointer text-black"
								onClick={() => setIsOpenList((prev) => !prev)}
							>
								{selectedIdeologia?.nome ?? "Selecione uma ideologia..."}
							</div>
							{isOpenList && (
								<div className="absolute w-full bg-white text-black rounded-b-md z-10 border-2 border-t-0 border-[#91ADF4]">
									<input
										type="text"
										placeholder="Pesquisar..."
										className="w-full p-2 text-black border-b border-gray-200 focus:outline-none rounded-lg"
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
									<div className="max-h-40 overflow-y-auto rounded-lg no-scrollbar scrollbar-none">
										{isLoadingIdeologias ? (
											<div className="p-2 text-gray-500">Carregando...</div>
										) : filteredIdeologias.length === 0 ? (
											<div className="p-2 text-gray-500">
												Nenhuma ideologia encontrada
											</div>
										) : (
											filteredIdeologias.map((d: ResponseIdeologiaDTO) => (
												<div
													key={d.id}
													className="p-2 hover:bg-gray-100 cursor-pointer text-black"
													onClick={() => handleIdeologiaSelect(d)}
												>
													{d.nome}
												</div>
											))
										)}
									</div>
								</div>
							)}
						</div>
						{errors.ideologiaId && (
							<p className="text-red-500 text-sm mt-1">
								{errors.ideologiaId.message}
							</p>
						)}
					</div>

					<button
						type="submit"
						disabled={!selectedIdeologia || isDeletingIdeologia}
						className={`
                        bg-[#122144] text-[#CDDBFF] border-2 border-[#CDDBFF] text-2xl w-32 h-12
                        ${selectedIdeologia && !isDeletingIdeologia ? "cursor-pointer" : "cursor-not-allowed"}
                    `}
					>
						{isDeletingIdeologia ? <p>Excluindo...</p> : <p>Excluir</p>}
					</button>
				</form>
			)}
			<IdeologiaDialog
				open={showSuccess}
				onOpenChange={setShowSuccess}
				title="Ideologia excluída com sucesso"
			/>
			<IdeologiaDialog
				open={showError}
				onOpenChange={setShowError}
				title={
					hasExcluirIdeologiaError
						? typeof hasExcluirIdeologiaError === "string"
							? hasExcluirIdeologiaError
							: "Erro ao excluir ideologia"
						: "Erro ao excluir ideologia"
				}
				type="error"
			/>
		</div>
	);
};

export default Page;

interface DialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	confirmLabel?: string;
	cancelLabel?: string;
	onConfirm?: () => void;
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
