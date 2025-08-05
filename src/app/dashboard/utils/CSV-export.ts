import type { FormeResults } from "@/interfaces";
import {
	formatDataForBarChart,
	formatDataForNumericBarChart,
	formatDataForPieChart,
} from ".";

type CSVRow = Record<string, string | number>;

const processMultipleChoiceQuestion = (
	questionData: FormeResults
): CSVRow[] => {
	const formattedData = formatDataForBarChart(questionData);
	return formattedData.map((item) => ({
		Question: questionData.question,
		Type: "Multiple Choice",
		Option: item.option,
		Count: item.Count,
		Answer: "",
	}));
};

const processSingleChoiceQuestion = (questionData: FormeResults): CSVRow[] => {
	const formattedData = formatDataForPieChart(questionData);
	return formattedData.map((item) => ({
		Question: questionData.question,
		Type: "Yes/No",
		Option: item.name,
		Count: item.amount,
		Answer: "",
	}));
};

const processNumericQuestion = (questionData: FormeResults): CSVRow[] => {
	const formattedData = formatDataForNumericBarChart(questionData);
	return formattedData.map((item) => ({
		Question: questionData.question,
		Type: "Numeric",
		Option: "",
		Count: item.Count,
		Answer: item.number.toString(),
	}));
};

const processTextQuestion = (questionData: FormeResults): CSVRow[] => {
	const questionType =
		questionData.type === "long" ? "Long Text" : "Short Text";

	return questionData.answers.map((answer, index) => ({
		Question: questionData.question,
		Type: questionType,
		Option: "",
		Count: "",
		Answer: typeof answer === "boolean" ? answer.toString() : (answer ?? ""),
		"Answer Index": index + 1,
	}));
};

const processQuestionData = (questionData: FormeResults): CSVRow[] => {
	switch (questionData.type) {
		case "multiple":
			return processMultipleChoiceQuestion(questionData);
		case "single":
			return processSingleChoiceQuestion(questionData);
		case "numeric":
			return processNumericQuestion(questionData);
		case "long":
		case "short":
			return processTextQuestion(questionData);
		default:
			return [];
	}
};

export const prepareCSVData = (data: FormeResults[]): CSVRow[] => {
	const csvData: CSVRow[] = [];

	for (const questionData of data) {
		const processedRows = processQuestionData(questionData);
		csvData.push(...processedRows);
	}

	return csvData;
};
