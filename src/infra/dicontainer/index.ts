import DireitoVioladoService from "@/core/services/direito-violado.service";
import DireitoVioladoAPI from "../api/direito-violado";
import EstadoService from "@/core/services/estado.service";
import EstadoAPI from "../api/estado";
import PartidoService from "@/core/services/partido.service";
import PartidoAPI from "../api/partido";

const DIContainer = {
	getDireitoVioladoUseCase: () => new DireitoVioladoService(new DireitoVioladoAPI()),
	getEstadoUseCase: () => new EstadoService(new EstadoAPI()),
	getPartidoUseCase: () => new PartidoService(new PartidoAPI())
}

export default DIContainer;
