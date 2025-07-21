import { getFormQuestions } from "@/services/filledForms/getFormQuestions";
import { getFormToEdit } from "@/services/edit-form/getFormToEdit";
import { checkFormOwnership } from "@/services/permissions/checkFormOwnership";
import EditFormComponent from "../components/EditFormComponent";
import { NavBar } from "@/components";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function page(props: { params: Promise<{ id: string }> }) {
	const params = await props.params;
	const session = await auth();

	if (!session) return redirect("/login");

	if (session.user.role === "user") {
		const isTheAhtor = await checkFormOwnership(
			Number.parseInt(params.id),
			session.user?.id ?? "",
		);

		if (!isTheAhtor) return redirect("/");
	}

	const [formGeneralData, questions] = await Promise.all([
		getFormToEdit(Number.parseInt(params.id)),
		getFormQuestions(Number.parseInt(params.id)),
	]);

	if (!formGeneralData) return redirect("/dashboard");

	const formatedQuestions = questions.map((question) => ({
		...question,
		id: String(question.id),
		formId: Number.parseInt(params.id),
		options: 'options' in question ? question.options?.map((optionText: string, index: number) => ({
			id: index + 1,
			questionId: question.id,
			optionText: optionText,
		})) || [] : [],
	}));

	return (
		<>
			<NavBar />
			<EditFormComponent
				formId={params.id}
				data={{ formGeneralData, questions: formatedQuestions }}
			/>
		</>
	);
}
