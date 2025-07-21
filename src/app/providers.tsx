"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { Guard } from "@/guards/Guard";

export function Providers({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	return (
		<NextUIProvider navigate={router.push}>
			<ThemeProvider attribute="class" defaultTheme="dark">
				<Guard>{children}</Guard>
			</ThemeProvider>
		</NextUIProvider>
	);
}
