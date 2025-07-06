import DIContainer from "../../config/dicontainer";

const usecase = DIContainer.getDadosUseCase();

export const getDadosBaseQueryKey = () => ["dados"];

export const listarProjetosPorUFOptions = (esfera?: string) => ({
	queryKey: [...getDadosBaseQueryKey(), "listarProjetosPorUF", esfera],
	queryFn: () => usecase.listarProjetosPorUF(esfera),
});

export const listarIdeologiaGeneroOptions = () => ({
	queryKey: [...getDadosBaseQueryKey(), "listarIdeologiaGenero"],
	queryFn: () => usecase.listarIdeologiaGenero(),
});

export const listarReligiaoRacaOptions = () => ({
	queryKey: [...getDadosBaseQueryKey(), "listarReligiaoRaca"],
	queryFn: () => usecase.listarReligiaoRaca(),
});

export const listarProjetosPorAnoOptions = () => ({
	queryKey: [...getDadosBaseQueryKey(), "listarProjetosPorAno"],
	queryFn: () => usecase.listarProjetosPorAno(),
});

export const listarPautaPorAnoOptions = () => ({
	queryKey: [...getDadosBaseQueryKey(), "listarPautaPorAno"],
	queryFn: () => usecase.listarPautaPorAno(),
});

export const listarPautaPorEsferaOptions = (esfera: string) => ({
	queryKey: [...getDadosBaseQueryKey(), "listarPautaPorEsfera", esfera],
	queryFn: () => usecase.listarPautaPorEsfera(esfera),
});

export const listarParlamentarEsferaOptions = (esfera: string) => ({
	queryKey: [...getDadosBaseQueryKey(), "listarParlamentarEsfera", esfera],
	queryFn: () => usecase.listarParlamentarEsfera(esfera),
});