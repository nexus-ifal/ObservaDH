import { Suspense } from "react";

import SolicitarRedefinicaoForm from "@/components/ui/formularios/solicitar-redefinicao-form";

const page: React.FC = () => {
	return (
		<div className="fundo-login flex items-center justify-center h-screen w-screen md:h-screen">
			<Suspense>
				<SolicitarRedefinicaoForm />
			</Suspense>
		</div>
	);
};

export default page;
