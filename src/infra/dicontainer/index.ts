import DireitoVioladoAPI from "../api/direito-violado";
import EstadoAPI from "../api/estado";
import PartidoAPI from "../api/partido";

import DireitoVioladoService from "@/core/services/direito-violado.service";
import EstadoService from "@/core/services/estado.service";
import PartidoService from "@/core/services/partido.service";

const DIContainer = {
	getDireitoVioladoUseCase: () =>
		new DireitoVioladoService(new DireitoVioladoAPI()),
	getEstadoUseCase: () => new EstadoService(new EstadoAPI()),
	getPartidoUseCase: () => new PartidoService(new PartidoAPI()),
};

export default DIContainer;
