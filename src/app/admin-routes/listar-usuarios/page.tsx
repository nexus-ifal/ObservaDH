"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import Loading from "@/components/ui/loading";

import { oswald } from "@/fonts/fonts";

export interface User {
	id: string;
	name: string;
	email: string;
	role: string;
}

export interface RespostaApi<T> {
	sucesso: boolean;
	mensagem: string;
	dados?: T;
}

export default function ListagemUsuarios() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setLoading(true);
				const response = await axios.get<RespostaApi<User[]>>(`/api/user`);

				if (response.data.sucesso && response.data.dados) {
					setUsers(response.data.dados);
				} else {
					setError(response.data.mensagem || "Erro ao carregar usuários");
				}
			} catch (err) {
				console.error("Erro ao buscar usuários:", err);
				setError("Não foi possível conectar ao servidor ou buscar os dados");
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	if (loading) {
		return (
			<div className="fundo-login flex items-center justify-center min-w-screen min-h-screen">
				<Loading />
			</div>
		);
	}

	if (error) {
		return (
			<div className="fundo-login flex flex-col items-center justify-center max-w-screen min-h-screen text-red-400 p-4">
				<p className="mb-4">{error}</p>
				<Link href="/admin-routes/acoes-usuario">
					<button
						className={`bg-[#121A2B] rounded-sm border-[2px] border-[#2C52A4] ${oswald.className} text-[#91ADF4] text-[15px] font-medium w-fit p-2 hover:cursor-pointer hover:bg-[#2C52A4] hover:border-[#121A2B] hover:text-[#121A2B] transition-colors duration-300`}
					>
						Voltar à página inicial
					</button>
				</Link>
			</div>
		);
	}

	return (
		<div className="fundo-login w-screen h-screen text-white p-8 flex flex-col justify-center items-center">
			<div className="w-full max-w-2xl">
				<h1
					className={`${oswald.className} text-[45px] text-white mb-6 text-center`}
				>
					Usuários cadastrados:
				</h1>

				{users.length === 0 ? (
					<p className={`${oswald.className} text-white text-[35px]`}>
						Nenhum usuário encontrado
					</p>
				) : (
					<div className="overflow-x-auto">
						<table className="min-w-full bg-white rounded-sm overflow-hidden">
							<thead>
								<tr className="bg-white text-left text-black">
									<th
										className={`${oswald.className} py-3 px-4 border-[2px] border-black`}
									>
										Nome
									</th>
									<th
										className={`${oswald.className} py-3 px-4 border-[2px] border-black`}
									>
										Função
									</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user) => (
									<tr
										key={user.id}
										className="border-[2px] border-black hover:bg-gray-300"
									>
										<td
											className={`${oswald.className} py-3 px-4 border-[2px] text-black`}
										>
											{user.name}
										</td>
										<td
											className={`${oswald.className} py-3 px-4 border-[2px] text-black`}
										>
											{user.role}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				<div className="mt-8 text-center">
					<Link href="/admin-routes/acoes-usuario">
						<button
							className={`bg-[#121A2B] rounded-sm border-[2px] border-[#2C52A4] ${oswald.className} text-[#91ADF4] text-[20px] font-medium w-fit p-2 hover:cursor-pointer hover:bg-[#2C52A4] hover:border-[#121A2B] hover:text-[#121A2B] transition-colors duration-300`}
						>
							Voltar à página inicial
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
