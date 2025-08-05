import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { NavBar } from "@/components";
import { loginMetaData } from "@/meta";
import { LoginForm } from "./components";

export const metadata = loginMetaData;

const page = async () => {
	const session = await auth();

	if (session) return redirect("/latest-forms");

	const t = await getTranslations("auth");

	return (
		<main className="min-h-screen overflow-x-hidden">
			<NavBar />
			<h1 className="mt-6 text-center font-semibold text-xl sm:text-2xl md:text-3xl">
				{t("title")}
			</h1>
			<section className="mx-auto mt-6 flex w-full justify-center">
				<LoginForm />
			</section>
		</main>
	);
};
export default page;
