"use client";

import { ScaleLoader } from "react-spinners";

import ActionButton from "@/components/ui/layouts/action-button";

import { oswald } from "@/core/lib/fonts/fonts";
import { useDireitoViolado } from "@/infra/hooks/direito-violado/use-direito-violado";

const DIREITOS_VIOLADOS_ACTIONS = [
	{
		title: "Cadastrar",
		path: "/admin/dados/direito-violado/cadastrar",
	},
	{
		title: "Excluir",
		path: "/admin/dados/direito-violado/excluir",
	},
	{
		title: "Atualizar",
		path: "/admin/dados/direito-violado/atualizar",
	},
];

const Page: React.FC = () => {
	const { direitosViolados, isLoadindDireitosViolados, error } =
		useDireitoViolado();
	return (
		<div
			className={`flex h-full w-full flex-col gap-14 px-12 py-20 ${oswald.className}`}
		>
			<nav className={"text-7xl"}>Escolha uma ação:</nav>
			<div className="flex h-full w-full justify-start gap-12 flex-col">
				<div className="flex w-full gap-6">
					{DIREITOS_VIOLADOS_ACTIONS.map((action) => (
						<ActionButton
							key={action.title}
							title={action.title}
							path={action.path}
						/>
					))}
				</div>
				<p className="text-[40px]">Direitos Violados existentes:</p>
				{isLoadindDireitosViolados ? (
					<div className="flex h-full w-full items-center justify-center">
						<ScaleLoader color="white" height={128} radius={8} width={16} />
					</div>
				) : (
					<table className="w-full border-collapse text-black overflow-hidden">
						<thead>
							<tr className="bg-gray-100">
								<th className="border-2 border-black px-4 py-3 text-left text-xl font-normal">
									Nome
								</th>
								<th className="border-2 border-black px-4 py-3 text-left text-xl font-normal">
									Sigla
								</th>
							</tr>
						</thead>
						<tbody>
							{error ? (
								<tr className="bg-white">
									<td
										colSpan={2}
										className="border-2 border-black px-4 py-3 text-lg text-red-600"
									>
										Erro ao carregar direitos violados.
									</td>
								</tr>
							) : direitosViolados && direitosViolados.length > 0 ? (
								direitosViolados.map(
									(
										direito: { id: string; nome: string; sigla: string },
										index: number
									) => (
										<tr
											key={direito.id}
											className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
										>
											<td className="border-2 border-black px-4 py-3 text-lg font-normal">
												{direito.nome}
											</td>
											<td className="border-2 border-black px-4 py-3 text-lg font-normal">
												{direito.sigla}
											</td>
										</tr>
									)
								)
							) : (
								<tr className="bg-white">
									<td
										colSpan={2}
										className="border-2 border-black px-4 py-3 text-lg"
									>
										Nenhum direito violado cadastrado.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

export default Page;
