import { ListarReligiaoRacaController } from "@/core/lib/api/controllers/dados/religiao-raca-controller";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const controller = new ListarReligiaoRacaController();

		const resposta = await controller.executar();

		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 404,
		});
	} catch (error) {
		return NextResponse.json(
			{
				sucesso: false,
				mensagem: "Erro ao listar religião e raça",
				dados: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		);
	}
}
