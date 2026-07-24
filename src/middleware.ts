import { NextResponse } from "next/server";

import { auth } from "../auth";

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
	runtime: "nodejs",
};

const ROTAS_PUBLICAS = [
	"/login",
	"/desenvolvedores",
	"/direitos",
	"/parlamentares",
	"/projetos",
	"/sobre",
	"/teste-ia",
];

const ROTAS_ADMIN = [
	"/admin-routes/acoes-usuario",
	"/admin-routes/atualizar-usuario",
	"/admin-routes/cadastro-usuario",
	"/admin-routes/exclusao-usuario",
	"/admin-routes/home",
	"/admin-routes/listar-usuarios",
];
const ROTAS_USER = [
	"/user-routes/home",
	"/user-routes/dados/atualizar/direito-violado",
	"/user-routes/dados/cadastrar/direito-violado",
	"/user-routes/dados/excluir/direito-violado",
	"/user-routes/dados/atualizar/estado",
	"/user-routes/dados/cadastrar/estado",
	"/user-routes/dados/excluir/estado",
	"/user-routes/dados/atualizar/ideologia",
	"/user-routes/dados/cadastrar/ideologia",
	"/user-routes/dados/excluir/ideologia",
	"/user-routes/dados/atualizar/partido",
	"/user-routes/dados/cadastrar/partido",
	"/user-routes/dados/excluir/partido",
	"/user-routes/dados/atualizar/pauta",
	"/user-routes/dados/cadastrar/pauta",
	"/user-routes/dados/excluir/pauta",
	"/user-routes/dados/atualizar/politico",
	"/user-routes/dados/cadastrar/politico",
	"/user-routes/dados/excluir/politico",
	"/user-routes/dados/atualizar/profissao",
	"/user-routes/dados/cadastrar/profissao",
	"/user-routes/dados/excluir/profissao",
	"/user-routes/dados/atualizar/projeto",
	"/user-routes/dados/cadastrar/projeto",
	"/user-routes/dados/excluir/projeto",
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default auth((req) => {
	const { nextUrl } = req;
	const session = req.auth;
	const autenticado = !!session;
	const userRole = session?.user?.role;
	const userRedirectTo = session?.user?.redirectTo;

	const rotaPublica =
		ROTAS_PUBLICAS.some((route) => nextUrl.pathname.startsWith(route)) ||
		nextUrl.pathname === "/" ||
		nextUrl.pathname.startsWith("/email-routes/redefinir-senha") ||
		nextUrl.pathname.startsWith("/email-routes/solicitar-redefinicao");

	const rotaAdmin = ROTAS_ADMIN.some((route) =>
		nextUrl.pathname.startsWith(route)
	);

	const rotaUser = ROTAS_USER.some((route) =>
		nextUrl.pathname.startsWith(route)
	);

	if (!autenticado && !rotaPublica) {
		const redirecione = new URL("/login", nextUrl.origin);
		redirecione.searchParams.set("callbackUrl", nextUrl.pathname);
		return NextResponse.redirect(redirecione);
	}

	if (autenticado && nextUrl.pathname === "/login") {
		const callbackUrl = nextUrl.searchParams.get("callbackUrl");

		if (callbackUrl) {
			return NextResponse.redirect(new URL(callbackUrl, nextUrl.origin));
		} else if (userRedirectTo) {
			return NextResponse.redirect(new URL(userRedirectTo, nextUrl.origin));
		} else {
			return NextResponse.redirect(new URL("/", nextUrl.origin));
		}
	}

	if (autenticado && (nextUrl.pathname === "/" || rotaPublica)) {
		if (userRedirectTo && userRedirectTo !== nextUrl.pathname) {
			return NextResponse.redirect(new URL(userRedirectTo, nextUrl.origin));
		}
	}

	if (autenticado) {
		if (rotaAdmin && userRole !== "ADMIN") {
			console.log("Acesso negado");
			return NextResponse.redirect(new URL("/404", nextUrl.origin));
		}

		if (rotaUser && userRole !== "EDITOR" && userRole !== "ADMIN") {
			console.log("Acesso negado");
			return NextResponse.redirect(new URL("/404", nextUrl.origin));
		}
	}

	return NextResponse.next();
});
