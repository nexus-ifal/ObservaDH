import FooterBar from "./footer-bar";
import NavBar from "./nav-bar";

interface mainLayoutProps {
	children: React.ReactNode;
}

const MainLayout: React.FC<mainLayoutProps> = ({ children }) => {
	return (
		<>
			<div className="bg-layout-principal antialiased no-scrollbar flex flex-col overflow-hidden">
				<header className="h-[25rem] tab:h-[34rem] des:h-[34rem] w-full">
					<NavBar />
				</header>
				<main className="h-full w-full bg-grid">
					<div className="h-full w-full my-10">{children}</div>
				</main>
				<footer className="h-[18.625rem] w-full">
					<FooterBar />
				</footer>
			</div>
		</>
	);
};

export default MainLayout;
