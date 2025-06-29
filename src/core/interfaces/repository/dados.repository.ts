export interface DadosRepository {
	listarProjetosPorUF(
		esfera?: string
	): Promise<{ uf: string; valor: number }[]>;
}
