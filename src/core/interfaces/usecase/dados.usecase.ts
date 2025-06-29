interface DadosUseCase {
	listarProjetosPorUF(
		esfera?: string
	): Promise<{ uf: string; valor: number }[]>;
}
export default DadosUseCase;
