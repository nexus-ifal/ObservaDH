import DadosAPI from "../../infra/api/dados";
import DireitoVioladoAPI from "../../infra/api/direito-violado";
import EstadoAPI from "../../infra/api/estado";
import IdeologiaAPI from "../../infra/api/ideologia";
import PartidoAPI from "../../infra/api/partido";
import PautaAPI from "../../infra/api/pauta";
import PoliticoAPI from "../../infra/api/politico";
import ProfissaoAPI from "../../infra/api/profissao";
import ProjetoAPI from "../../infra/api/projeto";

import DadosService from "@/core/application/dados.service";
import DireitoVioladoService from "@/core/application/direito-violado.service";
import EstadoService from "@/core/application/estado.service";
import IdeologiaService from "@/core/application/ideologia.service";
import PartidoService from "@/core/application/partido.service";
import PautaService from "@/core/application/pauta.service";
import PoliticoService from "@/core/application/politico.service";
import ProfissaoService from "@/core/application/profissao.service";
import ProjetoService from "@/core/application/projeto.service";

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
