import ProfissaoService from "@/core/services/profissao.service";
import DireitoVioladoAPI from "../api/direito-violado";
import EstadoAPI from "../api/estado";
import IdeologiaAPI from "../api/ideologia";
import PartidoAPI from "../api/partido";

import DireitoVioladoService from "@/core/services/direito-violado.service";
import EstadoService from "@/core/services/estado.service";
import IdeologiaService from "@/core/services/ideologia.service";
import PartidoService from "@/core/services/partido.service";
import ProfissaoAPI from "../api/profissao";

const DIContainer = {
	getDireitoVioladoUseCase: () =>
		new DireitoVioladoService(new DireitoVioladoAPI()),
	getEstadoUseCase: () => new EstadoService(new EstadoAPI()),
	getPartidoUseCase: () => new PartidoService(new PartidoAPI()),
	getIdeologiaUseCase: () => new IdeologiaService(new IdeologiaAPI()),
	getProfissaoUseCase: () => new ProfissaoService(new ProfissaoAPI()),
};

export default DIContainer;
