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
} from "@/components/ui-shacnui/alert-dialog";

import { oswald, titilliumWeb } from "@/core/lib/fonts/fonts";
import { usePauta } from "@/infra/hooks/pauta/use-pauta";
import { usePautaExcluir } from "@/infra/hooks/pauta/use-pauta-delete";
import { APIExcluirPautaPayload } from "@/infra/options/pauta";

const deleteSchema = z.object({
	pautaId: z.string().min(1, "Selecione uma pauta"),
});

type DeleteFormData = z.infer<typeof deleteSchema>;

const Page: React.FC = () => {
	const { pautas, isLoadingPautas } = usePauta();
	const {
		excluirPauta,
		hasExcluirPautaError,
		hasExcluirPautaSuccess,
		isDeletingPauta,
	} = usePautaExcluir();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [selectedPauta, setSelectedPauta] = useState<any>(null);
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

	const filteredPautas = useMemo(() => {
		if (!pautas) return [];
		if (!searchTerm) return pautas;
		return pautas.filter((e) =>
			e.nome.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [pautas, searchTerm]);

	const onSubmit = () => {
		if (!selectedPauta) return;
		const payload: APIExcluirPautaPayload = {
			id: selectedPauta.id,
		};
		excluirPauta({ payload });
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handlePautaSelect = (pauta: any) => {
		setSelectedPauta(pauta);
		setValue("pautaId", pauta.id);
		setIsOpenList(false);
		setSearchTerm("");
	};

	useEffect(() => {
		if (hasExcluirPautaSuccess) {
			setSelectedPauta("");
			setShowSuccess(true);
			setTimeout(() => setShowSuccess(false), 4000);
		}
		if (hasExcluirPautaError) {
			setShowError(true);
			setTimeout(() => setShowError(false), 4000);
		}
	}, [hasExcluirPautaSuccess, hasExcluirPautaError]);

	return (
		<div className="flex flex-col gap-14">
			<h1 className={`text-7xl ${oswald.className}`}>Exclusão: Pauta</h1>
			{isLoadingPautas ? (
				<div className="h-full w-full justify-center items-center text-white">
					<ScaleLoader color="" />
				</div>
			) : (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-row gap-6 items-end"
				>
					<div className={`${titilliumWeb.className} text-2xl`}>
						Pautas
						<div className="relative w-80 mt-2">
							<div
								className="border-2 border-[#91ADF4] rounded-t-lg bg-white p-2 cursor-pointer text-black"
								onClick={() => setIsOpenList((prev) => !prev)}
							>
								{selectedPauta?.nome ?? "Selecione uma pauta..."}
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
										{isLoadingPautas ? (
											<div className="p-2 text-gray-500">Carregando...</div>
										) : filteredPautas.length === 0 ? (
											<div className="p-2 text-gray-500">
												Nenhuma pauta encontrada
											</div>
										) : (
											filteredPautas.map((e) => (
												<div
													key={e.id}
													className="p-2 hover:bg-gray-100 cursor-pointer text-black"
													onClick={() => handlePautaSelect(e)}
												>
													{e.nome}
												</div>
											))
										)}
									</div>
								</div>
							)}
						</div>
						{errors.pautaId && (
							<p className="text-red-500 text-sm mt-1">
								{errors.pautaId.message}
							</p>
						)}
					</div>

					<button
						type="submit"
						disabled={!selectedPauta || isDeletingPauta}
						className={`
                        bg-[#122144] text-[#CDDBFF] border-2 border-[#CDDBFF] text-2xl w-32 h-12
                        ${selectedPauta && !isDeletingPauta ? "cursor-pointer" : "cursor-not-allowed"}
                    `}
					>
						{isDeletingPauta ? <p>Excluindo...</p> : <p>Excluir</p>}
					</button>
				</form>
			)}
			<PautaDialog
				open={showSuccess}
				onOpenChange={setShowSuccess}
				title="Pauta excluída com sucesso"
			/>
			<PautaDialog
				open={showError}
				onOpenChange={setShowError}
				title="Erro ao excluir pauta"
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

const PautaDialog: React.FC<DialogProps> = ({
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
