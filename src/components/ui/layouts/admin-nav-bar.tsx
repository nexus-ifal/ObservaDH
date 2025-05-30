import ActionButton from "./action-button";

import { oswald } from "@/core/lib/fonts/fonts";

interface AdminNavBarProps {
	model: string;
}

const AdminNavbar: React.FC<AdminNavBarProps> = ({ model }) => {
	const ACTIONS = [
		{
			title: "Cadastrar",
			path: `/admin/dados/cadastrar/${model}`,
		},
		{
			title: "Excluir",
			path: `/admin/dados/excluir/${model}`,
		},
		{
			title: "Atualizar",
			path: `/admin/dados/atualizar/${model}`,
		},
	];
	return (
		<header className="flex flex-col gap-14">
			<nav className={` text-7xl  ${oswald.className}`}>
				<h1>Escolha uma ação:</h1>
			</nav>
			<div className="flex w-full gap-6">
				{ACTIONS.map((action) => (
					<ActionButton
						key={action.title}
						title={action.title}
						path={action.path}
					/>
				))}
			</div>
		</header>
	);
};

export default AdminNavbar;
