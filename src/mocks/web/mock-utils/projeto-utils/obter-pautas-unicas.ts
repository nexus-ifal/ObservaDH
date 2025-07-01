import { ProjetoLei } from "@/core/domain/types/projeto-lei";

function obterPautasUnicas({
	projetos,
}: {
	projetos: ProjetoLei[];
}): { titulo: string; value: string }[] {
	const pautas = projetos.map((projeto) => projeto.pauta);
	const pautasUnicas = Array.from(new Set(pautas));
	return pautasUnicas.map((pauta) => ({
		titulo: pauta,
		value: pauta.toLowerCase(),
	}));
}

export default obterPautasUnicas;
