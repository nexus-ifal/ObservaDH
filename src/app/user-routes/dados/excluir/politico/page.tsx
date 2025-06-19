"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import Loading from "@/components/ui/loading";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui-shacnui/alert-dialog";

import { oswald, titilliumWeb } from "@/core/lib/fonts/fonts";
import { usePolitico } from "@/infra/hooks/politico/use-politico";
import { usePoliticoExcluir } from "@/infra/hooks/politico/use-politico-delete";
import { APIExcluirPoliticoPayload } from "@/infra/options/politico";

const deleteSchema = z.object({
	politicoId: z.string().min(1, "Selecione um político"),
});

type DeleteFormData = z.infer<typeof deleteSchema>;

const Page: React.FC = () => {
	const { politicos, isLoadingPoliticos } = usePolitico();
	const {
		excluirPolitico,
		hasExcluirPoliticoError,
		hasExcluirPoliticoSuccess,
		isDeletingPolitico,
	} = usePoliticoExcluir();

	type Politico = {
		id: string;
		nome: string;
	};

	const [selectedPolitico, setSelectedPolitico] = useState<Politico | null>(
		null
	);
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

	const filteredPoliticos = useMemo(() => {
		if (!politicos) return [];
		if (!searchTerm) return politicos;
		return politicos.filter((e) =>
			e.nome.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [politicos, searchTerm]);

	const onSubmit = () => {
		if (!selectedPolitico) return;
		const payload: APIExcluirPoliticoPayload = {
			id: selectedPolitico.id,
		};
		excluirPolitico({ payload });
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handlePoliticoSelect = (politico: any) => {
		setSelectedPolitico(politico);
		setValue("politicoId", politico.id);
		setIsOpenList(false);
		setSearchTerm("");
	};

	useEffect(() => {
		if (hasExcluirPoliticoSuccess) {
			setSelectedPolitico(null);
			setShowSuccess(true);
			setTimeout(() => setShowSuccess(false), 4000);
		}
		if (hasExcluirPoliticoError) {
			setShowError(true);
			setTimeout(() => setShowError(false), 4000);
		}
	}, [hasExcluirPoliticoSuccess, hasExcluirPoliticoError]);

	return (
		<div className="flex flex-col gap-14 h-full">
			{isLoadingPoliticos ? (
				<div className="flex h-full w-full justify-center items-center text-white">
					<Loading />
				</div>
			) : (
				<div className="flex flex-col gap-14 w-full ">
					<h1 className={`text-7xl ${oswald.className}`}>Exclusão: Político</h1>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-row gap-6 items-end bg--300"
					>
						<div className={`${titilliumWeb.className} text-2xl w-1/3`}>
							Políticos
							<div className="relative w-full mt-2 bg--400 ">
								<div
									className="border-2 border-[#91ADF4] w-full rounded-t-lg bg-white p-2 cursor-pointer text-black"
									onClick={() => setIsOpenList((prev) => !prev)}
								>
									{selectedPolitico?.nome ?? "Selecione um político..."}
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
											{isLoadingPoliticos ? (
												<div className="p-2 text-gray-500">Carregando...</div>
											) : filteredPoliticos.length === 0 ? (
												<div className="p-2 text-gray-500">
													Nenhum político encontrado
												</div>
											) : (
												filteredPoliticos.map((e) => (
													<div
														key={e.id}
														className="p-2 hover:bg-gray-100 cursor-pointer text-black"
														onClick={() => handlePoliticoSelect(e)}
													>
														{e.nome}
													</div>
												))
											)}
										</div>
									</div>
								)}
							</div>
							{errors.politicoId && (
								<p className="text-red-500 text-sm mt-1">
									{errors.politicoId.message}
								</p>
							)}
						</div>

						<button
							type="submit"
							disabled={!selectedPolitico || isDeletingPolitico}
							className={`
							bg-[#122144] text-[#CDDBFF] border-2 border-[#CDDBFF] text-2xl w-32 h-12
							${selectedPolitico && !isDeletingPolitico ? "cursor-pointer" : "cursor-not-allowed"}
						`}
						>
							{isDeletingPolitico ? <p>Excluindo...</p> : <p>Excluir</p>}
						</button>
					</form>
				</div>
			)}
			<PoliticoDialog
				open={showSuccess}
				onOpenChange={setShowSuccess}
				title="Político excluído com sucesso"
			/>
			<PoliticoDialog
				open={showError}
				onOpenChange={setShowError}
				title="Erro ao excluir político"
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

const PoliticoDialog: React.FC<DialogProps> = ({
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
