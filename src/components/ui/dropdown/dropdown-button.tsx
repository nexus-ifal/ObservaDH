"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/external/ui-shacnui/select";

import { elemento } from "@/core/domain/types/elemento-dropdown";

interface DropdownButtonProps {
	titulo?: string;
	param: string;
	elementos: elemento[];
	className?: string;
	classNameContent?: string;
	value?: string;
	onChange?: (value: string) => void;
	autoApply?: boolean;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
	elementos,
	className,
	titulo,
	param,
	classNameContent,
	value,
	onChange,
	autoApply = true,
}) => {
	const searchParams = useSearchParams();
	const pathName = usePathname();
	const { replace } = useRouter();

	function handleChange(valueSelected: string) {
		if (onChange) {
			onChange(valueSelected);
			return;
		}

		if (autoApply) {
			const params = new URLSearchParams(searchParams.toString());
			if (!valueSelected || valueSelected === "geral") {
				params.delete(param);
			} else {
				params.set(param, valueSelected);
			}
			replace(`${pathName}?${params.toString()}`, { scroll: false });
		}
	}

	return (
		<Select onValueChange={handleChange} value={value || ""}>
			<SelectTrigger
				className={`w-full h-10 tab:h-12 des:h-12 border-[#4568BE] rounded-[3px] text-[#4568BE] ${className}`}
			>
				<SelectValue placeholder={titulo} />
			</SelectTrigger>
			<SelectContent
				className={`text-[#4568BE] focus:text-[#4568BE] border-[#91ADF4] bg-[#91ADF4] ${className} ${classNameContent}`}
			>
				{elementos.map((item) => (
					<SelectItem
						value={item.value}
						key={item.value}
						className={`text-[#4568BE] focus:bg-[#1A326E] focus:text-[#91ADF4] flex text-start justify-start items-center min-h-10 ${className}`}
					>
						{item.titulo}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default DropdownButton;