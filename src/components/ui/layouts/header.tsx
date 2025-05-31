import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
	const router = usePathname();
	return (
		<>
			<div className="flex w-full items-center justify-center flex-col">
				<div className="w-11/12 flex flex-col">
					<div className="flex gap-[12.5rem] items-center justify-between">
						<Link href={"/"} className="z-10">
							<h1 className="text-[3.125rem] text-white logo" />
						</Link>
						<ul className="flex text-3xl font-normal text-white gap-[3.125rem] font">
							{[
								{ titulo: "PLs", rota: "/projetos" },
								{ titulo: "Parlamentares", rota: "/parlamentares" },
								{ titulo: "Direitos", rota: "/direitos" },
								{ titulo: "Sobre", rota: "/sobre" },
								{ titulo: "Desenvolvedores", rota: "/desenvolvedores" },
							].map((item) => {
								return (
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
								);
							})}
						</ul>
					</div>
				</div>
				<span className="w-full border border-white shadow-white" />
			</div>
		</>
	);
};

export default Header;
