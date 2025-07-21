import { getAllFormsByUserId } from "@/services/forms/getAllFormsByUserId";
import { FormsPage } from "../../components";
import { auth } from "@/auth";
import { NavBar } from "@/components";
import { redirect } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
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
