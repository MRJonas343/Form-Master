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
			<h1 className="mt-10 mb-10 text-center font-bold text-3xl">
				Popular Forms
			</h1>
			{children}
			<Snackbar />
		</>
	);
}
