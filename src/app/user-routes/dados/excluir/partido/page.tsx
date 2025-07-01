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

import { ResponsePartidoDTO } from "@/core/domain/dtos/partido.dto";
import { APIExcluirPartidoPayload } from "@/hooks/options/partido";
import { usePartido } from "@/infra/hooks/partido/use-partido";
import { usePartidoExcluir } from "@/infra/hooks/partido/use-partido-delete";

const deleteSchema = z.object({
	partidoId: z.string().min(1, "Selecione um partido"),
});

type DeleteFormData = z.infer<typeof deleteSchema>;

const Page: React.FC = () => {
	const { partidos, isLoadingPartidos } = usePartido();
	const {
		excluirPartido,
		hasExcluirPartidoError,
		hasExcluirPartidoSuccess,
		isDeletingPartido,
	} = usePartidoExcluir();

	const [selectedPartido, setSelectedPartido] =
		useState<ResponsePartidoDTO | null>(null);
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

	const filteredPartidos = useMemo(() => {
		if (!partidos) return [];
		if (!searchTerm) return partidos;
		return partidos.filter((e: ResponsePartidoDTO) =>
			e.nome.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [partidos, searchTerm]);

	const onSubmit = () => {
		if (!selectedPartido) return;
		const payload: APIExcluirPartidoPayload = {
			id: selectedPartido.id,
		};
		excluirPartido({ payload });
	};

	const handlePartidoSelect = (partido: ResponsePartidoDTO) => {
		setSelectedPartido(partido);
		setValue("partidoId", partido.id);
		setIsOpenList(false);
		setSearchTerm("");
	};

	useEffect(() => {
		if (hasExcluirPartidoSuccess) {
			setSelectedPartido(null);
			setShowSuccess(true);
			setTimeout(() => setShowSuccess(false), 4000);
		}
		if (hasExcluirPartidoError) {
			setShowError(true);
			setTimeout(() => setShowError(false), 4000);
		}
	}, [hasExcluirPartidoSuccess, hasExcluirPartidoError]);

	return (
		<div className="flex flex-col gap-14">
			<h1 className={`text-7xl ${oswald.className}`}>Exclusão: Partido</h1>
			{isLoadingPartidos ? (
				<div className="h-full w-full justify-center items-center text-white">
					<ScaleLoader color="" />
				</div>
			) : (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-row gap-6 items-end"
				>
					<div className={`${titilliumWeb.className} text-2xl`}>
						Partidos
						<div className="relative w-80 mt-2">
							<div
								className="border-2 border-[#91ADF4] rounded-t-lg bg-white p-2 cursor-pointer text-black"
								onClick={() => setIsOpenList((prev) => !prev)}
							>
								{selectedPartido?.nome ?? "Selecione um partido..."}
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
									<div className="max-h-40 overflow-y-auto rounded-lg no-scrollbar">
										{isLoadingPartidos ? (
											<div className="p-2 text-gray-500">Carregando...</div>
										) : filteredPartidos.length === 0 ? (
											<div className="p-2 text-gray-500">
												Nenhum partido encontrado
											</div>
										) : (
											filteredPartidos.map((e: ResponsePartidoDTO) => (
												<div
													key={e.id}
													className="p-2 hover:bg-gray-100 cursor-pointer text-black"
													onClick={() => handlePartidoSelect(e)}
												>
													{e.nome}
												</div>
											))
										)}
									</div>
								</div>
							)}
						</div>
						{errors.partidoId && (
							<p className="text-red-500 text-sm mt-1">
								{errors.partidoId.message}
							</p>
						)}
					</div>

					<button
						type="submit"
						disabled={!selectedPartido || isDeletingPartido}
						className={`
                        bg-[#122144] text-[#CDDBFF] border-2 border-[#CDDBFF] text-2xl w-32 h-12
                        ${selectedPartido && !isDeletingPartido ? "cursor-pointer" : "cursor-not-allowed"}
                    `}
					>
						{isDeletingPartido ? <p>Excluindo...</p> : <p>Excluir</p>}
					</button>
				</form>
			)}
			<PartidoDialog
				open={showSuccess}
				onOpenChange={setShowSuccess}
				title="Partido excluído com sucesso"
			/>
			<PartidoDialog
				open={showError}
				onOpenChange={setShowError}
				title="Erro ao excluir partido"
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

const PartidoDialog: React.FC<DialogProps> = ({
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
