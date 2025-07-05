import { Suspense } from "react";

import DeleteForm from "@/components/ui/formularios/delete-form";

const page: React.FC = () => {
	return (
		<div className="fundo-login flex items-center justify-center h-screen w-screen md:h-screen">
			<Suspense>
				<DeleteForm />
			</Suspense>
		</div>
	);
};

export default page;
