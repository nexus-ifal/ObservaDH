import * as React from "react";

import { Button } from "@/components/external/ui-shacnui/button";
import { Checkbox } from "@/components/external/ui-shacnui/checkbox";
import { Input } from "@/components/external/ui-shacnui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/external/ui-shacnui/popover";

import { cn } from "@/core/lib/utils/utils";

type Option = {
	value: string;
	label: string;
};

interface MultiSelectPopoverProps {
	options: Option[];
	value: string[];
	onChange: (value: string[]) => void;
	placeholder?: string;
	className?: string;
}

export function MultiSelectPopover({
	options,
	value,
	onChange,
	placeholder = "Selecione...",
	className,
}: MultiSelectPopoverProps) {
	const [open, setOpen] = React.useState(false);
	const [search, setSearch] = React.useState("");

	const filtered = React.useMemo(
		() =>
			options.filter((opt) =>
				opt.label.toLowerCase().includes(search.toLowerCase())
			),
		[options, search]
	);

	const toggleValue = (val: string) => {
		if (value.includes(val)) {
			onChange(value.filter((v) => v !== val));
		} else {
			onChange([...value, val]);
		}
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					type="button"
					variant="outline"
					className={cn(
						"w-full h-12 flex justify-between items-center bg-white text-black",
						className,
						value.length === 0 && "text-gray-400"
					)}
				>
					{value.length > 0
						? options
								.filter((opt) => value.includes(opt.value))
								.map((opt) => opt.label)
								.join(", ")
						: placeholder}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-72 p-2 bg-white">
				<Input
					placeholder="Buscar..."
					className="mb-2"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<div className="max-h-60 overflow-y-auto flex flex-col gap-1">
					{filtered.length === 0 && (
						<span className="text-2xl px-2 text-black">Nenhum resultado</span>
					)}
					{filtered.map((opt) => (
						<label
							key={opt.value}
							className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-gray-100"
						>
							<Checkbox
								checked={value.includes(opt.value)}
								onCheckedChange={() => toggleValue(opt.value)}
							/>
							<span>{opt.label}</span>
						</label>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
}
