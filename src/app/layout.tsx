import type { Metadata } from "next";
import "./styles/globals.css";
import { titilliumWeb } from "@/core/lib/fonts/fonts";
import QueryProvider from "@/components/ui/layouts/query-provider";

export const metadata: Metadata = {
	title: "ObservaDH",
	description: "Observatório de Projetos de Lei voltados aos Direitos LGBTI+.",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="pt-br" className={titilliumWeb.className}>
			<body className="bg-layout-principal antialiased no-scrollbar flex flex-col">
				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	);
}
