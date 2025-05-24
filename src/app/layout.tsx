"use client";

// import type { Metadata } from "next";
import "./styles/globals.css";

import { titilliumWeb } from "@/core/lib/fonts/fonts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//	export const metadata: Metadata = {
// 		title: "ObservaDH",
// 		description: "Observatório de Projetos de Lei voltados aos Direitos LGBTI+.",
// 	};

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			retryOnMount: false,
			refetchOnWindowFocus: false,
			staleTime: 15 * 60 * 1000,
		},
	},
});
export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<QueryClientProvider client={queryClient}>
			<html lang="pt-br" className={titilliumWeb.className}>
				<body className="bg-layout-principal antialiased no-scrollbar flex flex-col bg-red">
					{children}
				</body>
			</html>
		</QueryClientProvider>
	);
}
