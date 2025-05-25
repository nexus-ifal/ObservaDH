import { conexaoBackend } from "../../services/conexao-backend/client";

export async function buscarEsferas() {
	const response = await conexaoBackend.get("/esfera");

	const data = response.data.resposta.dados;

	if (data.length === 0) {
		console.error("Nenhum dado encontrado");
		return [];
	}
	if (response.status !== 200) {
		console.error("Erro ao buscar dados:", response.status);
		return [];
	}

	return data;
}
