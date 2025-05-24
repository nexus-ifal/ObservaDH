import { ProjetoLei } from "@/core/domain/graficos/types/projeto-lei";

function contarPropostasPorParlamentar(
	data: ProjetoLei[],
	nome: string
): number {
	let contador = 0;
	data.forEach((projeto) => {
		projeto.parlamentares.forEach((parlamentar) => {
			if (parlamentar.nome.toLowerCase() === nome.toLowerCase()) {
				contador++;
			}
		});
	});

	return contador;
}

export default contarPropostasPorParlamentar;
