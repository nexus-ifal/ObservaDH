import MainAdminLayout from "@/components/ui/layouts/main-admin-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<MainAdminLayout>
			<div className="h-full w-full">{children}</div>
		</MainAdminLayout>
	);
}
