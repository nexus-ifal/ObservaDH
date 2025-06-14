import { Suspense } from "react";

import UpdateForm from "@/components/ui/formularios/update-form";

const page: React.FC = () => {
	return (
		<div className="fundo-login flex items-center justify-center h-screen w-screen md:h-screen">
			<Suspense>
				<UpdateForm />
			</Suspense>
		</div>
	);
};

export default page;
