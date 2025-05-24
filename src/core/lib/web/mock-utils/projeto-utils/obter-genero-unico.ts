import { ProjetoLei } from "@/domain/graficos/types/projeto-lei";

function obterGeneroUnico({
	parlamentares,
}: {
	parlamentares: ProjetoLei[];
}): { titulo: string; value: string }[] {
	const generos = parlamentares.map(
		(parlamentar) => parlamentar.parlamentares[0].genero
	);
	const generosUnicos = Array.from(new Set(generos));
	return generosUnicos.map((genero) => ({
		titulo: genero,
		value: genero.toLowerCase(),
	}));
}

export default obterGeneroUnico;
