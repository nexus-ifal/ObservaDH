import FooterBar from "./footer-bar";
import NavBar from "./nav-bar";

/**
 * MainLayout - Primary Application Layout
 * 
 * The main layout component used across the application pages.
 * Provides consistent structure with header navigation, main content area, and footer.
 * 
 * Features:
 * - Fixed header with navigation (34rem height)
 * - Scrollable main content area with grid background
 * - Fixed footer (18.625rem height)
 * - Responsive design with Tailwind CSS
 */

interface mainLayoutProps {
	children: React.ReactNode;
}

const MainLayout: React.FC<mainLayoutProps> = ({ children }) => {
	return (
		<>
			<div className="bg-layout-principal antialiased no-scrollbar flex flex-col overflow-hidden">
				<header className="h-[34rem] w-full">
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

export default MainLayout;
