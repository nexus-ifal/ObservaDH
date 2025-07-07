import { NextResponse } from "next/server";

import { auth } from "../auth";

const ROTAS_PUBLICAS = [
	"/login",
	"/desenvolvedores",
	"/direitos",
	"/parlamentares",
	"/projetos",
	"/sobre",
];

const ROTAS_ADMIN = [
	"/admin-routes/cadastro-usuario",
	"/admin-routes/home",
	"/admin-routes/acoes-usuario",
	"/admin-routes/exclusao-usuario",
	"/admin-routes/atualizar-usuario",
	"/admin-routes/listar-usuarios",
];
const ROTAS_USER = [
	//TODO: adicionar TODAS as rotas de user
	"/user-routes/home",
	"/user-routes/dados/atualizar/estado",
	"/user-routes/dados/cadastrar/estado",
	"/user-routes/dados/excluir/estado",
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default auth((req) => {
	const { nextUrl } = req;
	const session = req.auth;
	const autenticado = !!session;
	const userRole = session?.user?.role;

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
		} else {
			if (userRole === "EDITOR") {
				return NextResponse.redirect(
					new URL("/user-routes/home", nextUrl.origin)
				);
			} else if (userRole === "ADMIN") {
				return NextResponse.redirect(
					new URL("/admin-routes/home", nextUrl.origin)
				);
			}
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

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
};
