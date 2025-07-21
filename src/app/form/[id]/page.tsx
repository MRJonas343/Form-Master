import { checkPermission } from "@/services/permissions/checkPermission";
import { getComments } from "@/services/comments/getComments";
import { getFormById } from "@/services/forms/getFormById";
import { getFormQuestions } from "@/services/filledForms/getFormQuestions";
import { isFormAlreadyFill } from "@/services/filledForms/isFormAlreadyFill";
import { FormComponent } from "../components/FormComponent";
import { redirect } from "next/navigation";
import { NavBar } from "@/components";
import { auth } from "@/auth";

export default async function FormPage(props: {
	params: Promise<{ id: string }>;
}) {
	const params = await props.params;
	const formId = Number.parseInt(params.id);
	const session = await auth();

	let isReadOnly = true;

	const [questions, formGeneralData, comments] = await Promise.all([
		getFormQuestions(formId),
		getFormById(formId),
		getComments(formId),
	]);

	if (!formGeneralData) {
		return <div>Form not found</div>;
	}

	if (!session) {
		return (
			<>
				<NavBar />
				<FormComponent
					isReadOnly={true}
					questions={questions}
					formGeneralData={formGeneralData}
					comments={comments}
				/>
			</>
		);
	}

	const isAuthor =
		String(session.user.id) === String(formGeneralData.author_id);

	if (isAuthor) {
		isReadOnly = true;
	} else {
		const isFormFilled = await isFormAlreadyFill(
			session.user.id ?? "",
			formId,
		);
		if (isFormFilled)
			return redirect(`/filled-form/${formId}/${session.user.id}`);

		if (formGeneralData.isPublic) {
			isReadOnly = false;
		} else {
			const hasPermission = await checkPermission(
				formId,
				session.user.id ?? "",
			);
			if (!hasPermission) isReadOnly = true;
		}
	}

	return (
		<>
			<NavBar />
			<FormComponent
				isReadOnly={isReadOnly}
				questions={questions}
				formGeneralData={formGeneralData}
				comments={comments}
			/>
		</>
	);
}
