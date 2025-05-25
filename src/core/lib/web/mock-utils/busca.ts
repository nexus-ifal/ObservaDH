import { projetosMock } from "@/mocks/mock-projetos";

//! esse método é simples, no entanto ele foi criado pensando no banco...
export function buscarProjetoPorId(id: string) {
	const projeto = projetosMock.find((projeto) => projeto.id === id);

	if (!projeto) {
		throw new Error("Projeto não encontrado");
	}

	return projeto;
}
