import type { Metadata } from "next";

import "./styles/globals.css";

import { titilliumWeb } from "@/lib/fonts/fonts";

export const metadata: Metadata = {
	title: "ObservaDH",
	description: "Observatório de Projetos de Lei voltados aos Direitos LGBTI+.",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="pt-br" className={titilliumWeb.className}>
			<body className="bg-layout-principal antialiased no-scrollbar flex flex-col bg-red">
				{children}
			</body>
		</html>
	);
}
