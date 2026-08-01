import CardDivider from "./card-divider";

interface StatusItemProps {
	titulo: string;
	valor: number;
}

const CardStatusItem: React.FC<StatusItemProps> = ({ titulo, valor }) => {
	return (
		<div className="flex gap-5 items-center text-white">
			<span className="h-3 w-3 rounded-full bg-[#91ADF4] font-normal text-xl" />
			{valor.toString().padStart(2, "0")}
			<CardDivider className="w-4" />
			{titulo}
		</div>
	);
};

export default CardStatusItem;
