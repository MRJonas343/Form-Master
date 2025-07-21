import type { NewQuestion } from ".";
import type { QuestionFieldProps } from ".";

export interface NewFilledForm {
	form: QuestionFieldProps[];
	isFormLiked: boolean;
	shouldSendCopy: boolean;
	userId: string;
	formId: number;
	userEmail?: string | null;
	userName?: string | null;
	formName?: string | null;
}
