import { ResponseProfissaoDTO } from "@/core/domain/dtos/profissao.dto";

interface ProfissaoUseCase {
	listar(): Promise<ResponseProfissaoDTO[]>;
}
export default ProfissaoUseCase;
