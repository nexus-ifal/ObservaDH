import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

interface ActionButtonProps {
	title: string;
	path: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ title, path }) => {
	return (
		<Link
			href={path}
			className="w-[30%] h-full text-3xl bg-[#121A2B] flex justify-between items-center p-6 border-2 rounded-[5px] hover:bg-[#1A326E] duration-200 border-[#AFC4F9]"
		>
			<span>{title}</span>
			<FaChevronRight />
		</Link>
	);
};

export default ActionButton;
