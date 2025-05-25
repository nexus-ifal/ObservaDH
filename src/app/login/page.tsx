import { redirect } from "next/navigation";

import { auth } from "../../../auth";

const page: React.FC = async () => {
	const session = await auth();
	if (session) redirect("/pagina-inicial-cadastro");

	return <div>{/* formulario de login */}</div>;
};

export default page;
