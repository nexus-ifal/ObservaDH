import { ChevronRightIcon } from "lucide-react";

import { titilliumWeb } from "@/fonts/fonts";

type BotaoAdminProps = {
	texto: string;
};

function BotaoAdmin({ texto }: BotaoAdminProps) {
	return (
		<button
			className={`flex items-center justify-between p-4 w-[500px] bg-[#121A2B] rounded-sm border-[2px] border-[#AFC4F9] ${titilliumWeb.className} text-white text-[30px] font-medium shadow-lg shadow-[#2C52A4]/40 hover:cursor-pointer hover:bg-[#1A326E] hover:text-white transition-colors duration-300`}
		>
			{texto}
			<ChevronRightIcon className="w-8 h-8 inline-block text-[#AFC4F9]" />
		</button>
	);
}

type BotaoAdminUserProps = {
	texto: string;
};

function BotaoAdminUser({ texto }: BotaoAdminUserProps) {
	return (
		<button
			className={`flex items-center justify-between p-4 w-[250px] bg-[#121A2B] rounded-sm border-[2px] border-[#AFC4F9] ${titilliumWeb.className} text-white text-[30px] font-medium shadow-lg shadow-[#2C52A4]/40 hover:cursor-pointer hover:bg-[#1A326E] hover:text-white transition-colors duration-300`}
		>
			{texto}
			<ChevronRightIcon className="w-8 h-8 inline-block text-[#AFC4F9]" />
		</button>
	);
}

export { BotaoAdmin, BotaoAdminUser };
