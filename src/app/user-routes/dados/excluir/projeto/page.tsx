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
import { useProjeto } from "@/infra/hooks/projeto/use-projeto";
import { useProjetoExcluir } from "@/infra/hooks/projeto/use-projeto-delete";
import { APIExcluirProjetoPayload } from "@/infra/options/projeto";
import Loading from "@/components/ui/loading";
import { ResponseProfissaoDTO } from "@/core/domain/dtos/profissao.dto";
import { ResponseProjetoDTO } from "@/core/domain/dtos/projeto.dto";

const deleteSchema = z.object({
	projetoId: z.string().min(1, "Selecione um projeto de lei"),
});

type DeleteFormData = z.infer<typeof deleteSchema>;

const Page: React.FC = () => {
	const { projetos, isLoadingProjetos } = useProjeto();
	const {
		excluirProjeto,
		hasExcluirProjetoError,
		hasExcluirProjetoSuccess,
		isDeletingProjeto,
	} = useProjetoExcluir();

	const [selectedProjeto, setSelectedProjeto] = useState<ResponseProjetoDTO>();
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

	const filteredProjetos = useMemo(() => {
		if (!projetos) return [];
		if (!searchTerm) return projetos;
		return projetos.filter((p) =>
			p.numeroPl.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [projetos, searchTerm]);

	const onSubmit = () => {
		if (!selectedProjeto) return;
		const payload: APIExcluirProjetoPayload = {
			id: selectedProjeto.id,
		};
		excluirProjeto({ payload });
	};
	const handleProjetoSelect = (projeto: any) => {
		setSelectedProjeto(projeto);
		setValue("projetoId", projeto.id);
		setIsOpenList(false);
		setSearchTerm("");
	};

	useEffect(() => {
		if (hasExcluirProjetoSuccess) {
			setSelectedProjeto(undefined);
			setShowSuccess(true);
			setTimeout(() => setShowSuccess(false), 4000);
		}
		if (hasExcluirProjetoError) {
			setShowError(true);
			setTimeout(() => setShowError(false), 4000);
		}
	}, [hasExcluirProjetoSuccess, hasExcluirProjetoError]);

	if (!isLoadingProjetos) console.log("Projetos:", projetos);

	if (isLoadingProjetos)
		return (
			<div className="h-full flex justify-center items-center">
				<Loading />
			</div>
		);

	return (
		<div className="w-full h-full flex flex-col gap-14">
			<h1 className={`text-7xl ${oswald.className}`}>
				Exclusão: Projeto de Lei
			</h1>
			{isLoadingProjetos ? (
				<div className="h-full w-full justify-center items-center text-white">
					<ScaleLoader color="" />
				</div>
			) : (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-row gap-6 items-end w-2/3"
				>
					<div className={`${titilliumWeb.className} w-full text-2xl`}>
						Projetos de Lei
						<div className="relative w-full mt-2">
							<div
								className="border-2 border-[#91ADF4] rounded-t-lg bg-white p-2 cursor-pointer text-black"
								onClick={() => setIsOpenList((prev) => !prev)}
							>
								{selectedProjeto
									? `${selectedProjeto.numeroPl}`
									: "Selecione um projeto de lei..."}
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
										{isLoadingProjetos ? (
											<div className="p-2 text-gray-500">Carregando...</div>
										) : filteredProjetos.length === 0 ? (
											<div className="p-2 text-gray-500">
												Nenhum projeto encontrado
											</div>
										) : (
											filteredProjetos.map((p) => (
												<div
													key={p.id}
													className="p-2 hover:bg-gray-100 cursor-pointer text-black"
													onClick={() => handleProjetoSelect(p)}
												>
													{p.numeroPl} - {p.esfera.nome} - {p.pauta.nome}
												</div>
											))
										)}
									</div>
								</div>
							)}
						</div>
						{errors.projetoId && (
							<p className="text-red-500 text-sm mt-1">
								{errors.projetoId.message}
							</p>
						)}
					</div>

					<button
						type="submit"
						disabled={!selectedProjeto || isDeletingProjeto}
						className={`
						bg-[#122144] text-[#CDDBFF] border-2 border-[#CDDBFF] text-2xl w-32 h-12
						${selectedProjeto && !isDeletingProjeto ? "cursor-pointer" : "cursor-not-allowed"}
					`}
					>
						{isDeletingProjeto ? <p>Excluindo...</p> : <p>Excluir</p>}
					</button>
				</form>
			)}
			<ProjetoDialog
				open={showSuccess}
				onOpenChange={setShowSuccess}
				title="Projeto de lei excluído com sucesso"
			/>
			<ProjetoDialog
				open={showError}
				onOpenChange={setShowError}
				title="Erro ao excluir projeto de lei"
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

const ProjetoDialog: React.FC<DialogProps> = ({
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
