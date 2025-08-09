import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { NavBar } from "@/components";
import { getAllFormsByUserId } from "@/services/forms/getAllFormsByUserId";
import { FormsPage } from "../../components";

export default async function page(props: { params: Promise<{ id: string }> }) {
	const params = await props.params;
	const session = await auth();

	if (!session) return redirect("/login");

	if (session.user.role !== "admin") return redirect("/");

	const forms = await getAllFormsByUserId(params.id);

	return (
		<>
			<NavBar />
			<FormsPage data={forms} />
		</>
	);
}
