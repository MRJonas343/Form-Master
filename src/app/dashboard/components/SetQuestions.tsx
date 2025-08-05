"use client";

import { DndContext } from "@dnd-kit/core";
import {
	restrictToParentElement,
	restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { type FC, useState } from "react";
import toast from "react-hot-toast";
import { initialQuestion } from "@/constants";
import { useDndSensors } from "@/hooks";
import type { NewQuestion, SetQuestionsProps } from "@/interfaces";
import { setNewFormQuestions } from "@/services/forms/setNewFormQuestions";
import { handleStatus } from "@/utils/handleStatus";
import { validateQuestions } from "@/validators";
import {
	changeControlledInputs,
	changeMultipleQuestionInputs,
	changeQuestionsPositions,
	createControlledInput,
	deleteControlledQuestion,
} from "../utils";
import { QuestionContainer } from "./QuestionContainer";

export const SetQuestions: FC<SetQuestionsProps> = ({ formId }) => {
	const [questions, setQuestions] = useState<NewQuestion[]>([initialQuestion]);

	const [isSubmitting, setIsSubmitting] = useState(false);

	const t = useTranslations("setQuestions");
	const sensors = useDndSensors();

	const createNewForm = async () => {
		setIsSubmitting(true);

		const questionsAreValid = validateQuestions.safeParse(questions);

		if (!questionsAreValid.success) {
			toast.error("Some questions are missing a name or type");
			setIsSubmitting(false);
			return;
		}

		const status = await setNewFormQuestions(
			Number.parseInt(formId, 10),
			questions
		);
		toast.success("Form is successfully created");
		handleStatus(status, t, "/dashboard");
		setIsSubmitting(false);
	};

	return (
		<>
			<div className="mx-auto mt-4 flex w-[90%] max-w-[1240px] flex-col sm:w-[95%]">
				<section className="mb-20 flex flex-col gap-3 sm:mt-4">
					<DndContext
						modifiers={[restrictToVerticalAxis, restrictToParentElement]}
						onDragEnd={(e) => changeQuestionsPositions(e, setQuestions)}
						sensors={sensors}
					>
						<SortableContext
							items={questions}
							strategy={verticalListSortingStrategy}
						>
							{questions.map((question) => (
								<QuestionContainer
									deleteQuestion={(id) =>
										deleteControlledQuestion(id, setQuestions)
									}
									description={question.description}
									displayInTable={question.displayInTable}
									id={question.id}
									key={question.id}
									onOptionsChange={(id, newOptions) =>
										changeMultipleQuestionInputs(id, newOptions, setQuestions)
									}
									onQuestionChange={(id, type, value) =>
										changeControlledInputs(id, type, value, setQuestions)
									}
									options={question.options}
									questionName={question.questionName}
									questionType={question.questionType}
								/>
							))}
						</SortableContext>
					</DndContext>
				</section>
			</div>
			<div className="fixed bottom-0 z-10 flex w-full justify-center gap-4 p-4 backdrop-blur-xl">
				<Button
					className="font-semibold"
					color="primary"
					onClick={() => createControlledInput(questions, setQuestions)}
					radius="sm"
					variant="flat"
				>
					{t("addQuestion")}
				</Button>
				<Button
					className="font-semibold"
					color="primary"
					isLoading={isSubmitting}
					onClick={createNewForm}
					radius="sm"
					variant="shadow"
				>
					{t("createForm")}
				</Button>
			</div>
		</>
	);
};
