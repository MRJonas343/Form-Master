import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { NavBar } from "@/components";
import { getFilledForm } from "@/services/filledForms/getFilledForm";
import { FilledForm } from "../../components/FilledForm";

const page = async (props: {
	params: Promise<{ formId: string; userId: string }>;
}) => {
	const params = await props.params;
	const session = await auth();

	if (!session) return redirect("/login");
	const userId = session.user?.id ?? "";

	const form = await getFilledForm(
		Number.parseInt(params.formId, 10),
		params.userId
	);

	if (
		session.user.role === "user" &&
		form.form?.author_id !== userId &&
		userId !== params.userId
	)
		return redirect("/");

	return (
		<>
			<NavBar />
			<FilledForm data={{ ...form, commentsResult: form.comments }} />
		</>
	);
};

export default page;
