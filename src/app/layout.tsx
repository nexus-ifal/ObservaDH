import type { Metadata } from "next";

import AuthProvider from "@/components/ui/layouts/auth-provider";
import QueryProvider from "@/components/ui/layouts/query-provider";

import { titilliumWeb } from "../fonts/fonts";

import "./styles/globals.css";

export const metadata: Metadata = {
	title: "ObservaDH",
	description: "Observatório de Projetos de Lei voltados aos Direitos LGBTI+.",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="pt-br" className={titilliumWeb.className}>
			<body className="layout-principal antialiased no-scrollbar scrollbar-none flex flex-col">
				<AuthProvider>
					<QueryProvider>{children}</QueryProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
