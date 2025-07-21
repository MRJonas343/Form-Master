import { v4 as uuid } from "uuid";
import type { NewQuestion, QuestionType } from "@/interfaces";

export const initialQuestion: NewQuestion = {
	id: uuid(),
	questionName: "",
	questionType: "" as QuestionType,
	description: "",
	displayInTable: false,
	options: [],
};
