import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { IoMdArrowDropright } from "react-icons/io";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
	const router = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const navLinks = [
		{ titulo: "Home", rota: "/" },
		{ titulo: "PLs", rota: "/projetos" },
		{ titulo: "Parlamentares", rota: "/parlamentares" },
		{ titulo: "Direitos", rota: "/direitos" },
		{ titulo: "Sobre", rota: "/sobre" },
		{ titulo: "Desenvolvedores", rota: "/desenvolvedores" },
	];

	return (
		<>
			<div className="flex w-full items-center justify-center flex-col">
				<div className="w-11/12 flex flex-col">
					<div className="flex gap-[6.25rem] tab:gap-[6.875rem] des:gap-[12.5rem] items-center justify-between">
						<Link href={"/"} className="z-10">
							<h1 className="text-[1.563rem] tab:text-[2.5rem] des:text-[3.125rem] text-white logo hover:cursor-pointer" />
						</Link>

						<ul className="hidden des:flex text-lg des:text-3xl font-normal text-white des:gap-[3.125rem] font">
							{navLinks.map((item) => (
								<li key={item.titulo} className="z-10">
									<Link
										href={item.rota}
										className={clsx(
											"flex items-center justify-center hover:text-[#4568BE]",
											{
												"text-[#4568BE]": router === item.rota,
											}
										)}
									>
										{item.titulo}
									</Link>
								</li>
							))}
						</ul>

						<button
							onClick={toggleMenu}
							className={clsx(
								"des:hidden text-white text-3xl tab:text-4xl z-50 focus:outline-none hover:cursor-pointer",
								{
									hidden: isMenuOpen,
								}
							)}
						>
							<FiMenu />
						</button>
					</div>
				</div>
				<span className="w-full border border-white shadow-white" />
			</div>

			<div
				className={clsx(
					"fixed top-0 right-0 h-fit w-fit border-[2px] border-[#87D9FF] rounded-[5px] p-4 tab:p-8 bg-[#122144] des:hidden z-40",
					{
						"-translate-x-2": isMenuOpen,
						"translate-y-2": isMenuOpen,
						"translate-x-full": !isMenuOpen,
					}
				)}
			>
				<div className="relative flex justify-end">
					<button
						onClick={toggleMenu}
						className="absolute inset-y-0 right-0 pr-1 text-white text-2xl tab:text-3xl focus:outline-none hover:cursor-pointer"
					>
						<FiX />
					</button>
				</div>

				<div className="flex flex-col items-center justify-center h-fit space-y-8">
					<ul className="flex flex-col gap-4 tab:gap-6 text-white text-lg tab:text-2xl">
						{navLinks.map((item) => (
							<li key={item.titulo}>
								<div className="flex gap-1 hover:cursor-pointer">
									<div className="text-[#87D9FF] text-xl tab:text-3xl">
										<IoMdArrowDropright />
									</div>
									<Link
										href={item.rota}
										className={clsx("flex items-center justify-start", {
											"text-[#4568BE]": router === item.rota,
										})}
										onClick={toggleMenu}
									>
										{item.titulo}
									</Link>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default Header;
