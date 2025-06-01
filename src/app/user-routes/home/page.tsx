import { oswald } from "@/core/lib/fonts/fonts";

const Page: React.FC = () => {
	return (
		<div
			className={`text-white justify-center items-center flex flex-col h-full w-full text-7xl font-normal ${oswald.className}`}
		>
			<p>Escolha um dos dados ao lado</p>
		</div>
	);
};
export default Page;
