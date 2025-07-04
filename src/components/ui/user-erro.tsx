"use client";

interface errorProps {
	error: Error | string | null;
}

const UserError: React.FC<errorProps> = ({ error }) => {
	return (
		<div className="flex flex-col items-center justify-center h-full p-8">
			<div className="bg-white/90 border border-red-200 rounded-lg p-8 max-w-md w-full text-center shadow-lg">
				<div className="text-8xl mb-4 text-red-600">{":["}</div>
				<h2 className="text-2xl font-bold text-red-600 mb-3">
					Ops! Algo deu errado
				</h2>
				<p className="text-red-500 mb-4 leading-relaxed">
					{error instanceof Error ? error.message : "Erro desconhecido"}
				</p>
				<p className="text-red-400 text-lg mb-6">
					Não é culpa sua, é um erro no servidor. Tente novamente mais tarde.
				</p>
				<button
					onClick={() => window.location.reload()}
					className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
				>
					Tentar novamente
				</button>
			</div>
		</div>
	);
};

export default UserError;
