import type { QuestionType } from "./QuestionType";

export interface Question {
	id: string;
	questionName: string;
	questionType: QuestionType;
	description: string;
	displayInTable: boolean;
	options?: string[];
	value?: string;
}

export interface QuestionProps {
	id: number;
	question: string | null;
	description: string | null;
	displayInTable: boolean | null;
	order: number | null;
	type: QuestionType | null;
	options?: string[];
	value?: string | boolean;
}
export interface formGeneralData {
	id: number;
	author_id: string;
	created_at: Date | null;
	title: string;
	topic: string;
	description: string;
	isPublic: boolean;
	imageUrl: string;
}

export interface AnswerProps {
	id: number;
	question: string | null;
	description: string | null;
	displayInTable: boolean | null;
	order: number | null;
	type: QuestionType | null;
	options?: string[];
	value?: string | boolean | number | undefined;
}
