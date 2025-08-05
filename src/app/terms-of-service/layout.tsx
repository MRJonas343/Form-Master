import { NavBar } from "@/components";
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
		</>
	);
}
