"use client";

import { useState } from "react";
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
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
	elementos,
	className,
	titulo,
	param,
	classNameContent,
}) => {
	const [filter, setFilter] = useState<string>("");

	const searchParams = useSearchParams();
	const pathName = usePathname();
	const { replace } = useRouter();

	function handleChange(value: string) {
		const params = new URLSearchParams(searchParams.toString());
		if (!value || value === "geral") {
			params.delete(param);
		} else {
			params.set(param, value);
		}
		replace(`${pathName}?${params.toString()}`, { scroll: false });
		setFilter(value);
	}

	return (
		<Select onValueChange={handleChange} value={filter}>
			<SelectTrigger
				className={`w-full h-12 border-[#4568BE] rounded-[3px] text-[#4568BE] ${className}`}
			>
				<SelectValue placeholder={titulo} />
			</SelectTrigger>
			<SelectContent
				className={`text-[#4568BE] focus:text-[#4568BE] border-[#91ADF4] bg-[#91ADF4] ${className} ${classNameContent}`}
			>
				{elementos.map((item) => {
					return (
						<SelectItem
							value={item.value}
							key={item.value}
							className={`text-[#4568BE] focus:bg-[#1A326E] focus:text-[#91ADF4] flex text-start justify-start items-center min-h-12 ${className}`}
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
