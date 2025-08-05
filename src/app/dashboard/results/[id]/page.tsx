import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { NavBar } from "@/components";
import type { FormeResults } from "@/interfaces";
import { getFormById } from "@/services/forms/getFormById";
import { getFormResults } from "@/services/forms/getFormResults";
import { FormResultsPage } from "../../components";

const page = async ({ params }: { params: { id: string } }) => {
	const session = await auth();

	if (!session) return redirect("/login");

	const form = await getFormById(Number.parseInt(params.id, 10));

	if (!form) return redirect("/");

	if (form.author_id !== session.user.id) return redirect("/");

	const responses = (await getFormResults(
		Number.parseInt(params.id, 10)
	)) as FormeResults[];

	return (
		<>
			<NavBar />
			<FormResultsPage data={responses} />
		</>
	);
};
export default page;
