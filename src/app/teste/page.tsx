"use client";


import { ResponseEstadoDTO } from "@/core/domain/dtos/estado.dto";
import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";

const Page: React.FC = () => {
	const [data, setData] = useState<ResponseEstadoDTO[]>([]);
	useEffect(() => {
		async function fetchData() {
		}
		fetchData();
	}, []);

	return (
		<div className="h-screen w-screen flex justify-center items-center">
			<div className="grid grid-cols-4">
				{data.length > 0 ? (
					data.map((estado, idx) => (
						<div key={estado.id ?? idx}>
							{`${estado.nome} - ${estado.sigla}`}
							{estado.politico?.map((politico) => {
								return (
									<div>
										<p>Parlamentares de {estado.nome}</p>
										<div key={politico.id}>{politico.nome}</div>
									</div>
								);
							})}
						</div>
					))
				) : (
					<div>
						<ScaleLoader speedMultiplier={1} color="white" />
					</div>
				)}
			</div>
		</div>
	);
};

export default Page;
