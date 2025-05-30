import { Suspense } from "react";

import LoginForm from "@/components/ui/formularios/login-form";

const page: React.FC = () => {
	return (
		<div className="fundo-login flex items-center justify-center h-screen w-screen md:h-screen">
			<Suspense>
				<LoginForm />
			</Suspense>
		</div>
	);
};

export default page;
