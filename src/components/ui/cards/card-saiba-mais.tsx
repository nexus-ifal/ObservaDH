import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/external/ui-shacnui/alert-dialog";

import Texto from "../componente-texto";

interface saibaMaisProps {
	className?: string;
	corTexto?: string;
	texto: string;
}

const CardSaibaMais: React.FC<saibaMaisProps> = ({
	className,
	corTexto,
	texto,
}) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<button
					className={`flex flex-row text-sm tab:text-xl items-center gap-2 tab:gap-4 ${className} text-[${corTexto}]`}
				>
					<div className="text-[16px] tab:text-[18px] ">
						<FaPlus size={18} />
					</div>
					Saiba mais
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent className="flex flex-col h-[90%] p-12 gap-6 w-[75%] bg-[#121A2B] border-[#4568BE] shadow-lg shadow-[#4568BE] rounded-lg">
				<AlertDialogTitle className="flex justify-between">
					<Texto.Raiz className="text-5xl w-full">
						<Texto.Linha>
							<Texto.Forte.Oswald>{"Aprofundamento"}</Texto.Forte.Oswald>
							<Texto.Espaco />
							<Texto.Pequeno.Titillium className={`${className} ${corTexto}`}>
								{"dos dados"}
							</Texto.Pequeno.Titillium>
						</Texto.Linha>
					</Texto.Raiz>
					<AlertDialogCancel className="">
						<IoMdClose size={26} color="white" />
					</AlertDialogCancel>
				</AlertDialogTitle>
				<AlertDialogDescription>
					<p className="text-[#AFC4F9] text-3xl text-justify">{texto}</p>
				</AlertDialogDescription>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default CardSaibaMais;
