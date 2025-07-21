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
import { Button, useDisclosure } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useReducer, useRef } from "react";
import toast from "react-hot-toast";
import { useDndSensors } from "@/hooks";
import type { QuestionType } from "@/interfaces";
import type { Question } from "@/interfaces/formDataToUpdate";
import { QuestionContainer } from "../../components";
import { formQuestionsReducer, initializer } from "../store/stateEditQuestions";
import {
	changeControlledInputs,
	changeMultipleQuestionInputs,
	changeQuestionsPositions,
	createControlledInput,
	deleteControlledQuestion,
	updateForm,
} from "../utils";
import ModalConfirm from "./ModalConfirm";

const FormQuestions = ({
	data,
	formId,
}: {
	data: Question[];
	formId: number;
}) => {
	const [state, dispatch] = useReducer(formQuestionsReducer, data, initializer);

	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

	const initialData = useRef(data);

	const sensors = useDndSensors();

	const t = useTranslations("setQuestions");

	const updateQuestions = async () => {
		dispatch({ type: "SET_IS_SUBMITTING", payload: true });
		const result = await updateForm(state.questionsState, initialData);
		if (result === "SUCCESS") toast.success("Questions updated successfully");
		dispatch({ type: "SET_IS_SUBMITTING", payload: false });
	};

	const onOpenQuestionModal = (id: string) => {
		dispatch({ type: "SET_QUESTION_TO_DELETE", payload: id });
		onOpen();
	};

	const isExistingQuestion = (questionId: string) => {
		return initialData.current.some((q) => q.id === questionId);
	};

	return (
		<>
			<div className="mt-4 flex flex-col w-[90%] sm:w-[95%] mx-auto max-w-[1240px]">
				<section className="sm:mt-4 flex flex-col gap-3 mb-20">
					<DndContext
						sensors={sensors}
						onDragEnd={(e) =>
							changeQuestionsPositions(state, formId, e, dispatch)
						}
						modifiers={[restrictToVerticalAxis, restrictToParentElement]}
					>
						<SortableContext
							items={state.questionsState}
							strategy={verticalListSortingStrategy}
						>
							{state.questionsState.map((question) => (
								<QuestionContainer
									key={question.id}
									id={String(question.id)}
									disableType={isExistingQuestion(question.id)}
									description={question.description ?? ""}
									questionName={question.question}
									onQuestionChange={(id, type, value) => {
										changeControlledInputs(id, type, value, dispatch);
									}}
									deleteQuestion={(id) => {
										onOpenQuestionModal(id);
									}}
									questionType={question.type as QuestionType}
									displayInTable={question.displayInTable}
									options={
										question.options?.map((option) => option.optionText) || []
									}
									onOptionsChange={(id, newOptions) => {
										changeMultipleQuestionInputs(id, newOptions, dispatch);
									}}
								/>
							))}
						</SortableContext>
					</DndContext>
				</section>
			</div>
			<div className="z-10 fixed bottom-0 w-full flex p-4 justify-center backdrop-blur-xl gap-4">
				<Button
					variant="flat"
					color="primary"
					radius="sm"
					className="font-semibold"
					onClick={() =>
						createControlledInput(formId, state.questionsState, dispatch)
					}
				>
					{t("addQuestion")}
				</Button>
				<Button
					isLoading={state.isSubmitting}
					variant="shadow"
					color="primary"
					radius="sm"
					className="font-semibold"
					onClick={updateQuestions}
				>
					{t("updateQuestions")}
				</Button>
			</div>
			<ModalConfirm
				isOpen={isOpen}
				onOpen={onOpen}
				onOpenChange={onOpenChange}
				onConfirm={() => {
					if (state.questionToDelete) {
						deleteControlledQuestion(
							state.questionToDelete,
							formId,
							state,
							dispatch,
						);
						onClose();
					}
				}}
			/>
		</>
	);
};
export default FormQuestions;
