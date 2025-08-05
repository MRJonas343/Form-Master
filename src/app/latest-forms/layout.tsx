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
			{children}
			<Snackbar />
		</>
	);
}
