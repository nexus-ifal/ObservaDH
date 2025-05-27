import PautaAPI from "../api/pauta";
import EstadoAPI from "../api/estado";
import PartidoAPI from "../api/partido";
import ProjetoAPI from "../api/projeto";
import PoliticoAPI from "../api/politico";
import IdeologiaAPI from "../api/ideologia";
import ProfissaoAPI from "../api/profissao";
import DireitoVioladoAPI from "../api/direito-violado";

import PautaService from "@/core/services/pauta.service";
import EstadoService from "@/core/services/estado.service";
import PartidoService from "@/core/services/partido.service";
import ProjetoService from "@/core/services/projeto.service";
import PoliticoService from "@/core/services/politico.service";
import IdeologiaService from "@/core/services/ideologia.service";
import ProfissaoService from "@/core/services/profissao.service";
import DireitoVioladoService from "@/core/services/direito-violado.service";

const DIContainer = {
	getDireitoVioladoUseCase: () =>
		new DireitoVioladoService(new DireitoVioladoAPI()),
	getEstadoUseCase: () => new EstadoService(new EstadoAPI()),
	getPartidoUseCase: () => new PartidoService(new PartidoAPI()),
	getIdeologiaUseCase: () => new IdeologiaService(new IdeologiaAPI()),
	getProfissaoUseCase: () => new ProfissaoService(new ProfissaoAPI()),
	getProjetoUseCase: () => new ProjetoService(new ProjetoAPI()),
	getPautaUseCase: () => new PautaService(new PautaAPI()),
	getPoliticoUseCase: () => new PoliticoService(new PoliticoAPI()),
};

export default DIContainer;
