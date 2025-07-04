/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { ScaleLoader } from "react-spinners";
import { useParams } from "next/navigation";

import AdminNavBar from "@/components/ui/layouts/admin-nav-bar";

import { useDireitoViolado } from "@/hooks/direito-violado/use-direito-violado";
import { useEstado } from "@/hooks/estado/use-estado";
import { useIdeologia } from "@/hooks/ideologia/use-ideologia";
import { usePartido } from "@/hooks/partido/use-partido";
import { usePauta } from "@/hooks/pauta/use-pauta";
import { usePolitico } from "@/hooks/politico/use-politico";
import { useProfissao } from "@/hooks/profissao/use-profissao";
import { useProjeto } from "@/hooks/projeto/use-projeto";

const modelconfiguracao = {
	estado: {
		hook: useEstado,
		dataKey: "estados",
		loadingKey: "isLoadingEstados",
		colunas: [
			{ key: "nome", label: "Nome" },
			{ key: "sigla", label: "Sigla" },
		],
	},
	"direito-violado": {
		hook: useDireitoViolado,
		dataKey: "direitosViolados",
		loadingKey: "isLoadingDireitosViolados",
		colunas: [
			{ key: "nome", label: "Nome" },
			{ key: "sigla", label: "Sigla" },
		],
	},
	partido: {
		hook: usePartido,
		dataKey: "partidos",
		loadingKey: "isLoadingPartidos",
		colunas: [
			{ key: "nome", label: "Nome" },
			{ key: "sigla", label: "Sigla" },
		],
	},
	ideologia: {
		hook: useIdeologia,
		dataKey: "ideologias",
		loadingKey: "isLoadingIdeologias",
		colunas: [
			{ key: "nome", label: "Nome" },
			{ key: "sigla", label: "Sigla" },
		],
	},
	profissao: {
		hook: useProfissao,
		dataKey: "profissoes",
		loadingKey: "isLoadingProfissoes",
		colunas: [{ key: "nome", label: "Nome" }],
	},
	pauta: {
		hook: usePauta,
		dataKey: "pautas",
		loadingKey: "isLoadingPautas",
		colunas: [{ key: "nome", label: "Nome" }],
	},
	politico: {
		hook: usePolitico,
		dataKey: "politicos",
		loadingKey: "isLoadingPoliticos",
		colunas: [
			{ key: "nome", label: "Nome" },
			{ key: "genero", label: "Gênero" },
		],
	},
	projeto: {
		hook: useProjeto,
		dataKey: "projetos",
		loadingKey: "isLoadingProjetos",
		colunas: [
			{ key: "numeroPl", label: "Número do PL" },
			{ key: "ano", label: "ano" },
		],
	},
};

const Page: React.FC = () => {
	const { model } = useParams();
	const configuracao =
		modelconfiguracao[model as keyof typeof modelconfiguracao];

	if (!configuracao) return <div>Modelo não encontrado: {model}</div>;

	const hookResult = configuracao.hook();
	const data = (hookResult as Record<string, any>)[configuracao.dataKey] || [];
	const isLoading =
		hookResult[configuracao.loadingKey as keyof typeof hookResult] || false;
	const error = hookResult.error;
	const columns = configuracao.colunas;

	return (
		<div className="flex h-full w-full flex-col gap-14 pb-6">
			<AdminNavBar model={model as string} />
			<div className="overflow-auto no-scrollbar h-full">
				<p className="text-[40px]">{model} existentes:</p>
				{isLoading ? (
					<div className="flex h-full w-full items-center justify-center">
						<ScaleLoader color="white" height={128} radius={8} width={16} />
					</div>
				) : (
					<table className="w-full border-collapse text-black overflow-auto">
						<thead>
							<tr className="bg-gray-100">
								{columns.map((column) => (
									<th
										key={column.key}
										className="border-2 border-black px-4 py-3 text-left text-xl font-normal"
									>
										{column.label}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{error ? (
								<tr className="bg-white">
									<td
										colSpan={columns.length}
										className="border-2 border-black px-4 py-3 text-lg text-red-600"
									>
										Erro ao carregar {model}.
									</td>
								</tr>
							) : data.length > 0 ? (
								data.map((item: any, index: number) => (
									<tr
										key={item.id}
										className={index % 2 === 0 ? "bg-white" : "bg-gray-300"}
									>
										{columns.map((column) => (
											<td
												key={column.key}
												className="border-2 border-black px-4 py-3 text-lg font-normal"
											>
												{item[column.key]}
											</td>
										))}
									</tr>
								))
							) : (
								<tr className="bg-white">
									<td
										colSpan={columns.length}
										className="border-2 border-black px-4 py-3 text-lg font-normal text-center"
									>
										Nenhum dado encontrado.
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
