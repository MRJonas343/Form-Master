import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { NavBar } from "@/components";
import { registerMetaData } from "@/meta";
import { RegisterForm } from "./components";

export const metadata = registerMetaData;

const page = async () => {
	const session = await auth();

	const t = await getTranslations("auth");

	if (session) return redirect("/");

	return (
		<main className="overflow-x-hidden min-h-screen">
			<NavBar />
			<h1 className="text-center mt-6 text-xl sm:text-2xl md:text-3xl font-semibold">
				{t("join")} 💖
			</h1>
			<section className="flex w-full mx-auto justify-center mt-6">
				<RegisterForm />
			</section>
		</main>
	);
};
export default page;
