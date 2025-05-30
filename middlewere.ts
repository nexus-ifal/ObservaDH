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

const ROTAS_ADIMIN = ["/cadastro-usuario"];
const ROTAS_USER = ["/"]; //TODO: adicionar as rotas de user

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

	if (autenticado && nextUrl.pathname === "/login") {
		return NextResponse.redirect(new URL("/", nextUrl.origin)); //TODO: adicionar a rota da pagina inicial do cadastro dos dados
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
