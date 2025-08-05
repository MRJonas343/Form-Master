import { Analytics } from "@vercel/analytics/next";
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
				className="light bg-background text-foreground"
				lang={locale}
				suppressHydrationWarning
			>
				<body
					className={`${poppinsFont.className} overflow-x-hidden text-black antialiased dark:bg-[#1C1B29] dark:text-white`}
				>
					<NextIntlClientProvider messages={messages}>
						<Providers>
							{children}
							<Snackbar />
							<Analytics />
						</Providers>
					</NextIntlClientProvider>
				</body>
			</html>
		</SessionProvider>
	);
}
