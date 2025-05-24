import { ProjetoLei } from "@/core/domain/graficos/types/projeto-lei";

function obterProfissoesUnicas({
	projetos,
}: {
	projetos: ProjetoLei[];
}): { titulo: string; value: string }[] {
	const profissoes = projetos.map(
		(projeto) => projeto.parlamentares[0].profissao
	);
	const profissoesUnicas = Array.from(new Set(profissoes));
	return profissoesUnicas.map((profissao) => ({
		titulo: profissao,
		value: profissao.toLowerCase(),
	}));
}

export default obterProfissoesUnicas;
