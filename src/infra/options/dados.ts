import DIContainer from "../dicontainer";

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
