import {
	CreatePautaDTO,
	ResponsePautaDTO,
	UpdatePautaDTO,
} from "@/core/domain/dtos/pauta.dto";

/**
 * Use case interface for Pauta (Agenda/Issue) operations
 * Handles CRUD operations for legislative agendas while maintaining Portuguese database model names
 */
interface PautaUseCase {
	list(): Promise<ResponsePautaDTO[]>;
	create(pauta: CreatePautaDTO): Promise<ResponsePautaDTO>;
	update(id: string, pauta: UpdatePautaDTO): Promise<ResponsePautaDTO>;
	delete(id: string): Promise<ResponsePautaDTO>;
}

export default PautaUseCase;
