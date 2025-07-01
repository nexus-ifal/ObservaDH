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

import { useEstado } from "@/hooks/estado/use-estado";
import { useEstadoExcluir } from "@/hooks/estado/use-estado-delete";
import { APIExcluirEstadoPayload } from "@/hooks/options/estado";

const deleteSchema = z.object({
	estadoId: z.string().min(1, "Selecione um estado"),
});

type DeleteFormData = z.infer<typeof deleteSchema>;

const Page: React.FC = () => {
	const { estados, isLoadingEstados } = useEstado();
	const {
		excluirEstado,
		hasExcluirEstadoError,
		hasExcluirEstadoSuccess,
		isDeletingEstado,
	} = useEstadoExcluir();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [selectedEstado, setSelectedEstado] = useState<any>(null);
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

	const filteredEstados = useMemo(() => {
		if (!estados) return [];
		if (!searchTerm) return estados;
		return estados.filter((e) =>
			e.nome.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [estados, searchTerm]);

	const onSubmit = () => {
		if (!selectedEstado) return;
		const payload: APIExcluirEstadoPayload = {
			id: selectedEstado.id,
		};
		excluirEstado({ payload });
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleEstadoSelect = (estado: any) => {
		setSelectedEstado(estado);
		setValue("estadoId", estado.id);
		setIsOpenList(false);
		setSearchTerm("");
	};

	useEffect(() => {
		if (hasExcluirEstadoSuccess) {
			setSelectedEstado("");
			setShowSuccess(true);
			setTimeout(() => setShowSuccess(false), 4000);
		}
		if (hasExcluirEstadoError) {
			setShowError(true);
			setTimeout(() => setShowError(false), 4000);
		}
	}, [hasExcluirEstadoSuccess, hasExcluirEstadoError]);

	return (
		<div className="flex flex-col gap-14">
			<h1 className={`text-7xl ${oswald.className}`}>Exclusão: Estado</h1>
			{isLoadingEstados ? (
				<div className="h-full w-full justify-center items-center text-white">
					<ScaleLoader color="" />
				</div>
			) : (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-row gap-6 items-end"
				>
					<div className={`${titilliumWeb.className} text-2xl`}>
						Estados
						<div className="relative w-80 mt-2">
							<div
								className="border-2 border-[#91ADF4] rounded-t-lg bg-white p-2 cursor-pointer text-black"
								onClick={() => setIsOpenList((prev) => !prev)}
							>
								{selectedEstado?.nome ?? "Selecione um estado..."}
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
										{isLoadingEstados ? (
											<div className="p-2 text-gray-500">Carregando...</div>
										) : filteredEstados.length === 0 ? (
											<div className="p-2 text-gray-500">
												Nenhum estado encontrado
											</div>
										) : (
											filteredEstados.map((e) => (
												<div
													key={e.id}
													className="p-2 hover:bg-gray-100 cursor-pointer text-black"
													onClick={() => handleEstadoSelect(e)}
												>
													{e.nome}
												</div>
											))
										)}
									</div>
								</div>
							)}
						</div>
						{errors.estadoId && (
							<p className="text-red-500 text-sm mt-1">
								{errors.estadoId.message}
							</p>
						)}
					</div>

					<button
						type="submit"
						disabled={!selectedEstado || isDeletingEstado}
						className={`
						bg-[#122144] text-[#CDDBFF] border-2 border-[#CDDBFF] text-2xl w-32 h-12
						${selectedEstado && !isDeletingEstado ? "cursor-pointer" : "cursor-not-allowed"}
					`}
					>
						{isDeletingEstado ? <p>Excluindo...</p> : <p>Excluir</p>}
					</button>
				</form>
			)}
			<EstadoDialog
				open={showSuccess}
				onOpenChange={setShowSuccess}
				title="Estado excluido com sucesso"
			/>
			<EstadoDialog
				open={showError}
				onOpenChange={setShowError}
				title="Erro ao excluir estado"
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
