import MainAdminLayout from "@/components/ui/layouts/main-admin-layout";
import QueryProvider from "@/components/ui/layouts/query-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<MainAdminLayout>
			<div className="h-full w-full pt-20 px-12 bg-[#050B17]">
				<QueryProvider>{children}</QueryProvider>
			</div>
		</MainAdminLayout>
	);
}
