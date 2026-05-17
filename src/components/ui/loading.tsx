import { ScaleLoader } from "react-spinners";

const 	Loading = () => {
	return (
		<div className="flex flex-col items-center justify-center text-white gap-4">
			<ScaleLoader
				color="#ffffff"
				height={72}
				margin={4}
				radius={9}
				width={12}
			/>
			<p className="select-none">Carregando...</p>
		</div>
	);
};

export default Loading;
