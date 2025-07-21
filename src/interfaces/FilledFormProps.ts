import type { QuestionType } from ".";

export interface FilledFormProps {
	form: Form | undefined;
	commentsResult: CommentsResult[];
	questions: Question[];
}

export interface CommentsResult {
	id: number;
	comment: string;
	userName: string;
}

export interface Form {
	id: number;
	author_id: string;
	created_at: Date;
	title: string;
	topic: string;
	description: string;
	isPublic: boolean;
	imageUrl: string;
}

export interface Question {
	id: number;
	question: string;
	description: string | null;
	displayInTable: boolean;
	order: number;
	type: string;
	answer: unknown;
	options?: unknown[];
	filledFormID: number | null;
}

export interface FilledQuestionProps {
	id: number;
	question: string;
	description: string | null;
	displayInTable: boolean;
	order: number;
	type: string;
	answer: unknown;
	options?: unknown[];
	value?: string | boolean | number;
	updateValue: (id: number, value: string | boolean | number) => void;
}

export interface NewQuestion {
	id: string;
	questionName: string;
	questionType: QuestionType;
	description: string;
	displayInTable: boolean;
	options?: string[];
	value?: string;
}

export interface QuestionFieldProps {
	id: number;
	question: string | null;
	description: string | null;
	displayInTable: boolean | null;
	order: number | null;
	type: QuestionType | null;
	options?: string[];
	value?: string | boolean | number;
}
