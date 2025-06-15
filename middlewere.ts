export { auth as middleware } from "./auth";
import { NextResponse } from "next/server";

import { auth } from "./auth";

const ROTAS_PUBLICAS = [
	"/login",
	"/desenvolvedores",
	"/direitos",
	"/parlamentares",
	"/projetos",
	"/sobre",
	"/",
];

const ROTAS_ADIMIN = [
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
	"/user-routes/dados/[model]",
	"/user-routes/dados/atualizar/estado",
	"/user-routes/dados/cadastrar/estado",
	"/user-routes/dados/atualizar/estado",
];

export default auth((req) => {
	const { nextUrl } = req;
	const session = req.auth;
	const autenticado = !!session;
	const userRole = session?.user?.role;

	const rotaPublica = ROTAS_PUBLICAS.some((route) =>
		nextUrl.pathname.startsWith(route)
	);

	if (!autenticado && !rotaPublica) {
		const redirecione = new URL("/login", nextUrl.origin);
		redirecione.searchParams.set("callbackUrl", nextUrl.pathname);
		return NextResponse.redirect(redirecione);
	}

	if (autenticado && nextUrl.pathname === "/login" && userRole === "EDITOR") {
		return NextResponse.redirect(new URL("/user-routes/home", nextUrl.origin));
	} else if (
		autenticado &&
		nextUrl.pathname === "/login" &&
		userRole === "ADMIN"
	) {
		return NextResponse.redirect(new URL("/admin-routes/home", nextUrl.origin));
	}

	if (autenticado) {
		if (
			ROTAS_ADIMIN.some((route) => nextUrl.pathname.startsWith(route)) &&
			userRole !== "ADMIN"
		) {
			console.log("Apenas administradores podem acessar esta rota");
			return NextResponse.redirect(new URL("/login", nextUrl.origin));
		}

		if (
			ROTAS_USER.some((route) => nextUrl.pathname.startsWith(route)) &&
			!userRole
		) {
			console.log("Acesso negado, usuário sem permissão de acesso");
			return NextResponse.redirect(new URL("/404", nextUrl.origin));
		}
	}

	return NextResponse.next();
});

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
