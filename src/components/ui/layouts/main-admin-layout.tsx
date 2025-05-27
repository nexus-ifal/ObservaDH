import SideBar from "./side-bar";

interface MainAdminLayoutProps {
	children: React.ReactNode;
}

const MainAdminLayout: React.FC<MainAdminLayoutProps> = ({ children }) => {
	return (
		<div className="flex flex-col h-screen bg-layout-admin">
			<header>
				<nav></nav>
			</header>
			<main className="text-white h-full w-full flex">
				<aside className="h-full w-1/4">
					<SideBar />
				</aside>
				<div className="w-3/4 h-full">{children}</div>
			</main>
		</div>
	);
};

export default MainAdminLayout;
