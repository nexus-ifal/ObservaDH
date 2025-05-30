import { ResponseProfissaoDTO } from "@/core/domain/dtos/profissao.dto";

export interface ProfissaoRepository {
	listar(): Promise<ResponseProfissaoDTO[]>;
}
