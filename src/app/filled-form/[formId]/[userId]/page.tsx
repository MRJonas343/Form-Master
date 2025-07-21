import { FilledForm } from "../../components/FilledForm";
import { NavBar } from "@/components";
import { getFilledForm } from "@/services/filledForms/getFilledForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async (props: {
	params: Promise<{ formId: string; userId: string }>;
}) => {
	const params = await props.params;
	const session = await auth();

	if (!session) return redirect("/login");
	const userId = session.user?.id ?? "";

	const form = await getFilledForm(
		Number.parseInt(params.formId),
		params.userId,
	);

	if (session.user.role === "user") {
		if (form.form?.author_id !== userId) {
			if (userId !== params.userId) return redirect("/");
		}
	}

	return (
		<>
			<NavBar />
			<FilledForm data={{ ...form, commentsResult: form.comments }} />
		</>
	);
};

export default page;
