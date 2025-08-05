import { NavBar, Snackbar } from "@/components";
import { mainPageMetaData } from "@/meta";

export const metadata = mainPageMetaData;

export default function MainPageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<NavBar />
			<h1 className="text-3xl font-bold text-center mt-10 mb-10">Popular Forms</h1>
			{children}
			<Snackbar />
		</>
	);
}
