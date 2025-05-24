import { elemento } from "@/domain/graficos/types/elemento-dropdown";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui-shacnui/select";

interface DropdownButtonProps {
	titulo?: string;
	elementos: elemento[];
	className?: string;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
	elementos,
	className,
	titulo,
}) => {
	return (
		<Select>
			<SelectTrigger
				className={`w-full h-12 border-[#4568BE] rounded-[3px] text-[#4568BE] ${className} `}
			>
				<SelectValue placeholder={titulo} />
			</SelectTrigger>
			<SelectContent className="text-[#4568BE] focus:text-[#4568BE] border-[#91ADF4] w-32 bg-[#91ADF4] ">
				{elementos.map((item) => {
					return (
						<SelectItem
							value={item.value}
							key={item.value}
							className="text-[#4568BE] focus:bg-[#1A326E] focus:text-[#91ADF4] flex justify-start items-center min-h-12"
						>
							{item.titulo}
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
};

export default DropdownButton;
