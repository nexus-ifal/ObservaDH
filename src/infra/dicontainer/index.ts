import DadosAPI from "../api/dados";
import DireitoVioladoAPI from "../api/direito-violado";
import EstadoAPI from "../api/estado";
import IdeologiaAPI from "../api/ideologia";
import PartidoAPI from "../api/partido";
import PautaAPI from "../api/pauta";
import PoliticoAPI from "../api/politico";
import ProfissaoAPI from "../api/profissao";
import ProjetoAPI from "../api/projeto";

import DadosService from "@/core/services/dados.service";
import DireitoVioladoService from "@/core/services/direito-violado.service";
import EstadoService from "@/core/services/estado.service";
import IdeologiaService from "@/core/services/ideologia.service";
import PartidoService from "@/core/services/partido.service";
import PautaService from "@/core/services/pauta.service";
import PoliticoService from "@/core/services/politico.service";
import ProfissaoService from "@/core/services/profissao.service";
import ProjetoService from "@/core/services/projeto.service";

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
	getDadosUseCase: () => new DadosService(new DadosAPI()),
};

export default DIContainer;
