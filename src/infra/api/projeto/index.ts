import { Pauta } from "@/core/domain/models/pauta";
import { Projeto } from "@/core/domain/models/projeto";
import { conexaoBackend } from "@/infra/services/conexao-backend/client";

export async function buscarAnoProjeto(): Promise<string[]> {
	try {
		const resposta = await conexaoBackend.get("/projeto/");

		const dados = resposta.data?.resposta?.dados;
		if (!Array.isArray(dados)) {
			throw new Error("Formato inesperado: `resposta.dados` não é array");
		}

		const anos = dados
			.map((p: Projeto) => p.ano)
			.filter((ano) => typeof ano === "string");
		const anosUnicos = Array.from(new Set(anos));

		return anosUnicos;
	} catch (erro) {
		console.error("[buscarAnoProjeto] erro ao buscar projetos:", erro);
		throw new Error("Não foi possível obter os anos dos projetos");
	}
}

interface ProjetoPorAno {
	ano: string;
	projetos: number;
}

export async function buscarProjetosPorAno(): Promise<ProjetoPorAno[]> {
	try {
		const resposta = await conexaoBackend.get(`/projeto/`);

		const dados = resposta.data.resposta.dados as Projeto[];

		const anosContagem: Record<string, number> = {};

		dados.forEach((item) => {
			anosContagem[item.ano] = (anosContagem[item.ano] || 0) + 1;
		});

		const resultado = Object.entries(anosContagem).map(([ano, projetos]) => ({
			ano,
			projetos,
		}));

		return resultado;
	} catch (error) {
		console.error("Erro ao buscar projetos por ano:", error);
		throw error;
	}
}
type ContagemPorAno = {
	ano: string;
	linguagensNeutra: number;
	atletasTrans: number;
	banheirosMultigenero: number;
	propagandaLGBT: number;
};

export async function buscarPautasPorAno(): Promise<ContagemPorAno[]> {
	try {
		const respostaProjeto = await conexaoBackend.get("/projeto/");
		const projetos: Projeto[] = respostaProjeto.data?.resposta?.dados;
		if (!Array.isArray(projetos)) {
			throw new Error("Formato inesperado: resposta.dados não é array");
		}

		const respostaPauta = await conexaoBackend.get("/pauta/");
		const pautas: Pauta[] = respostaPauta.data?.resposta?.dados;
		if (!Array.isArray(pautas)) {
			throw new Error(
				"Formato inesperado: resposta.dados de pauta não é array"
			);
		}

		const mapaPauta = pautas.reduce<Record<string, string>>((acc, p) => {
			if (p.id !== undefined && p.nome !== undefined) {
				acc[String(p.id)] = String(p.nome);
			}
			return acc;
		}, {});

		const agrupado: Record<string, Record<string, number>> = {};
		projetos.forEach((proj) => {
			const ano = proj.ano;
			const nomePauta = mapaPauta[proj.pautaId] ?? "Desconhecida";
			agrupado[ano] ??= {};
			agrupado[ano][nomePauta] = (agrupado[ano][nomePauta] || 0) + 1;
		});

		return Object.entries(agrupado).map(([ano, contagens]) => ({
			ano,
			linguagensNeutra: contagens["Linguagem Neutra"] || 0,
			atletasTrans: contagens["Atletas Trans"] || 0,
			banheirosMultigenero: contagens["Banheiros Multigênero"] || 0,
			propagandaLGBT: contagens["Propaganda LGBT"] || 0,
		}));
	} catch (error) {
		console.error("[buscarPautasPorAno] erro:", error);
		throw new Error("Não foi possível buscar pautas por ano");
	}
}
