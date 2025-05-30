import { Suspense } from "react";

import LoginForm from "@/components/ui/login-form";

//import AcmeLogo from "@/app/ui/acme-logo";

export default function loginPage() {
	return (
		<div className="fundo-login flex items-center justify-center h-screen w-screen md:h-screen">
			<Suspense>
				<LoginForm />
			</Suspense>
		</div>
	);
}
