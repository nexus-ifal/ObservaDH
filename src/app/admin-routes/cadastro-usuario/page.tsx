import { Suspense } from "react";

import RegisterForm from "@/components/ui/formularios/register-form";

const page: React.FC = () => {
	return (
		<div className="fundo-login flex items-center justify-center h-screen w-screen md:h-screen">
			<Suspense>
				<RegisterForm />
			</Suspense>
		</div>
	);
};

export default page;
