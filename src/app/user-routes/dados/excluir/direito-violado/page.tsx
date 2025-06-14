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

import { ResponseDireitoVioladoDTO } from "@/core/domain/dtos/direito-violado.dto";
import { oswald, titilliumWeb } from "@/core/lib/fonts/fonts";
import { useDireitoViolado } from "@/infra/hooks/direito-violado/use-direito-violado";
import { useDireitoVioladoExcluir } from "@/infra/hooks/direito-violado/use-direito-violado-delete";
import { APIExcluirDireitoVioladoPayload } from "@/infra/options/direito-violado";

const deleteSchema = z.object({
	direitoId: z.string().min(1, "Selecione um direito violado"),
});

type DeleteFormData = z.infer<typeof deleteSchema>;

const Page: React.FC = () => {
	const { direitosViolados, isLoadingDireitosViolados } = useDireitoViolado();
	const {
		excluirDireitoViolado,
		isDeletingDireitoViolado,
		hasExcluirDireitoVioladoError,
		hasExcluirDireitoVioladoSuccess,
	} = useDireitoVioladoExcluir();

	const [selectedDireito, setSelectedDireito] =
		useState<ResponseDireitoVioladoDTO | null>(null);
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

	const filteredDireitos = useMemo(() => {
		if (!direitosViolados) return [];
		if (!searchTerm) return direitosViolados;
		return direitosViolados.filter((d: ResponseDireitoVioladoDTO) =>
			d.nome.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [direitosViolados, searchTerm]);

	const onSubmit = () => {
		if (!selectedDireito) return;
		const payload: APIExcluirDireitoVioladoPayload = {
			id: selectedDireito.id,
		};
		excluirDireitoViolado({ payload });
	};

	const handleDireitoSelect = (direito: ResponseDireitoVioladoDTO) => {
		setSelectedDireito(direito);
		setValue("direitoId", direito.id);
		setIsOpenList(false);
		setSearchTerm("");
	};

	useEffect(() => {
		let successTimeout: NodeJS.Timeout | null = null;
		let errorTimeout: NodeJS.Timeout | null = null;

		if (hasExcluirDireitoVioladoSuccess) {
			setSelectedDireito(null);
			setShowSuccess(true);
			successTimeout = setTimeout(() => setShowSuccess(false), 4000);
		}
		if (hasExcluirDireitoVioladoError) {
			setShowError(true);
			errorTimeout = setTimeout(() => setShowError(false), 4000);
		}

		return () => {
			if (successTimeout) clearTimeout(successTimeout);
			if (errorTimeout) clearTimeout(errorTimeout);
		};
	}, [hasExcluirDireitoVioladoSuccess, hasExcluirDireitoVioladoError]);

	return (
		<div className="flex flex-col gap-14">
			<h1 className={`text-7xl ${oswald.className}`}>
				Exclusão: Direito Violado
			</h1>
			{isLoadingDireitosViolados ? (
				<div className="h-full w-full justify-center items-center text-white">
					<ScaleLoader color="#CDDBFF" />
				</div>
			) : (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-row gap-6 items-end"
				>
					<div className={`${titilliumWeb.className} text-2xl`}>
						Direitos Violados
						<div className="relative w-80 mt-2">
							<div
								className="border-2 border-[#91ADF4] rounded-t-lg bg-white p-2 cursor-pointer text-black"
								onClick={() => setIsOpenList((prev) => !prev)}
							>
								{selectedDireito?.nome ?? "Selecione um direito violado..."}
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
										{isLoadingDireitosViolados ? (
											<div className="p-2 text-gray-500">Carregando...</div>
										) : filteredDireitos.length === 0 ? (
											<div className="p-2 text-gray-500">
												Nenhum direito violado encontrado
											</div>
										) : (
											filteredDireitos.map((d: ResponseDireitoVioladoDTO) => (
												<div
													key={d.id}
													className="p-2 hover:bg-gray-100 cursor-pointer text-black"
													onClick={() => handleDireitoSelect(d)}
												>
													{d.nome}
												</div>
											))
										)}
									</div>
								</div>
							)}
						</div>
						{errors.direitoId && (
							<p className="text-red-500 text-sm mt-1">
								{errors.direitoId.message}
							</p>
						)}
					</div>

					<button
						type="submit"
						disabled={!selectedDireito || isDeletingDireitoViolado}
						className={`
						bg-[#122144] text-[#CDDBFF] border-2 border-[#CDDBFF] text-2xl w-32 h-12
						${selectedDireito && !isDeletingDireitoViolado ? "cursor-pointer" : "cursor-not-allowed"}
					`}
					>
						{isDeletingDireitoViolado ? <p>Excluindo...</p> : <p>Excluir</p>}
					</button>
				</form>
			)}
			<DireitoVioladoDialog
				open={showSuccess}
				onOpenChange={setShowSuccess}
				title="Direito violado excluído com sucesso"
			/>
			<DireitoVioladoDialog
				open={showError}
				onOpenChange={setShowError}
				title={
					hasExcluirDireitoVioladoError
						? typeof hasExcluirDireitoVioladoError === "string"
							? hasExcluirDireitoVioladoError
							: "Erro ao excluir direito violado"
						: "Erro ao excluir direito violado"
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
