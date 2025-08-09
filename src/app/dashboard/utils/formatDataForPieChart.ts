import type { FormeResults } from "@/interfaces";

export const formatDataForPieChart = (
	questionData: FormeResults,
	allFormData?: FormeResults[]
) => {
	if (questionData.type !== "single") return [];

	const trueCount = questionData.answers.filter(
		(answer) => answer === true
	).length;
	const falseCount = questionData.answers.filter(
		(answer) => answer === false
	).length;

	// Si no hay respuestas falsas pero tenemos datos de otras preguntas,
	// calculamos el total basándose en la pregunta con más respuestas
	let totalResponses = trueCount + falseCount;

	if (falseCount === 0 && allFormData) {
		// Encontrar el máximo número de respuestas en otras preguntas
		const maxResponses = Math.max(...allFormData.map((q) => q.answers.length));
		totalResponses = maxResponses;
	}

	const actualFalseCount = totalResponses - trueCount;

	return [
		{ name: "Yes", amount: trueCount },
		{ name: "No", amount: actualFalseCount },
	];
};
