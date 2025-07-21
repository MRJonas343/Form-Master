import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Snackbar } from "@/components";
import { poppinsFont } from "@/fonts/font";
import { Providers } from "./providers";
import "./globals.css";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();

	const messages = await getMessages();

	return (
		<SessionProvider>
			<html
				lang={locale}
				className="light text-foreground bg-background"
				suppressHydrationWarning
			>
				<body
					className={`${poppinsFont.className} antialiased text-black dark:text-white overflow-x-hidden dark:bg-[#1C1B29]`}
				>
					<NextIntlClientProvider messages={messages}>
						<Providers>
							{children}
							<Snackbar />
						</Providers>
					</NextIntlClientProvider>
				</body>
			</html>
		</SessionProvider>
	);
}
