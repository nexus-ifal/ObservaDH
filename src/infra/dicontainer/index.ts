import DireitoVioladoService from "@/core/services/direito-violado.service";
import DireitoVioladoAPI from "../api/direito-violado";

const DIContainer = {
	getDireitoVioladoUseCase: () => new DireitoVioladoService(new DireitoVioladoAPI()),
}

export default DIContainer;