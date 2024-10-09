import type { QuestionType } from "./QuestionType";

export interface QuestionElementProps {
	id: string;
	questionName: string;
	onQuestionChange: (id: string, key: string, value: string) => void;
	questionType: QuestionType;
	description: string;
	options?: string[];
	value?: string;
}
