interface DividerProps {
	className?: string;
}

const CardDivider: React.FC<DividerProps> = ({ className }) => {
	return (
		<>
			{className ? (
				<div className={`${className} h-[0.5px] tab:h-[1px] bg-white`} />
			) : (
				<div className="border-gradient" />
			)}
		</>
	);
};

export default CardDivider;
