import DireitoVioladoService from "@/core/services/direito-violado.service";
import DireitoVioladoAPI from "../api/direito-violado";
import EstadoService from "@/core/services/estado.service";
import EstadoAPI from "../api/estado";

const DIContainer = {
	getDireitoVioladoUseCase: () => new DireitoVioladoService(new DireitoVioladoAPI()),
	getEstadoUseCase: () => new EstadoService(new EstadoAPI()),
}

export default DIContainer;
