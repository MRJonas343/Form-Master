import type { NewFilledForm } from "@/interfaces";

export const EmailTemplate: React.FC<Readonly<NewFilledForm>> = ({
	form,
	formId,
	userId,
	userName,
	formName,
}) => (
	<div>
		<h1>Hello {userName}</h1>
		<p>You just filled out the form {formName} with the following answers:</p>
		<ul>
			{form.map((question) => (
				<li key={question.id}>
					{question.question}:{" "}
					{question.type === "single" && question.value === true && "Yes"}
					{question.type === "single" && question.value === false && "No"}
					{question.value}
				</li>
			))}
		</ul>
	</div>
);
