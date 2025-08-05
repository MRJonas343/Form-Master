import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { NavBar } from "@/components";
import { registerMetaData } from "@/meta";
import { RegisterForm } from "./components";

export const metadata = registerMetaData;

export default async function Page() {
	const session = await auth();

	const t = await getTranslations("auth");

	if (session) return redirect("/latest-forms");

	return (
		<main className="min-h-screen overflow-x-hidden">
			<NavBar />
			<h1 className="mt-6 text-center font-semibold text-xl sm:text-2xl md:text-3xl">
				{t("join")} 💖
			</h1>
			<section className="mx-auto mt-6 flex w-full justify-center">
				<RegisterForm />
			</section>
		</main>
	);
}
