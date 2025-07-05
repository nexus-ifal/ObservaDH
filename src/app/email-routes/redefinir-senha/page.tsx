import { Suspense } from "react";

import RedefinirSenhaForm from "@/components/ui/formularios/redefinir-senha-form";

const page: React.FC = () => {
	return (
		<div className="fundo-login flex items-center justify-center h-screen w-screen md:h-screen">
			<Suspense>
				<RedefinirSenhaForm />
			</Suspense>
		</div>
	);
};

export default page;
