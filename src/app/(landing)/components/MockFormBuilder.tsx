"use client";

import {
	Button,
	Card,
	Checkbox,
	Input,
	Link,
	Radio,
	RadioGroup,
	Select,
	SelectItem,
	Textarea,
} from "@nextui-org/react";

import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineDragIndicator } from "react-icons/md";
import type { QuestionType } from "@/interfaces";

interface MockQuestion {
	id: string;
	questionName: string;
	questionType: QuestionType;
	description: string;
	displayInTable: boolean;
	options?: string[];
}

export const MockFormBuilder = () => {
	const [questions, setQuestions] = useState<MockQuestion[]>([
		{
			id: "1",
			questionName: "How would you rate our service?",
			questionType: "multiple",
			description: "Please select one option",
			displayInTable: true,
			options: ["Excellent", "Good", "Fair", "Poor"],
		},
		{
			id: "2",
			questionName: "What can we improve?",
			questionType: "long",
			description: "Share your detailed feedback",
			displayInTable: false,
		},
	]);

	const deleteQuestion = (id: string) => {
		setQuestions(questions.filter((q) => q.id !== id));
	};

	const updateQuestion = (
		id: string,
		field: keyof MockQuestion,
		value: string | boolean | QuestionType
	) => {
		setQuestions(
			questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
		);
	};

	const updateOptions = (id: string, newOptions: string[]) => {
		setQuestions(
			questions.map((q) => (q.id === id ? { ...q, options: newOptions } : q))
		);
	};

	const renderQuestionPreview = (question: MockQuestion) => {
		switch (question.questionType) {
			case "short":
				return (
					<Input
						className="mt-2"
						isDisabled
						label="Your answer"
						placeholder="Enter your answer..."
						radius="sm"
						variant="bordered"
					/>
				);
			case "long":
				return (
					<Textarea
						className="mt-2"
						isDisabled
						label="Your answer"
						placeholder="Enter your detailed answer..."
						radius="sm"
						variant="bordered"
					/>
				);
			case "numeric":
				return (
					<Input
						className="mt-2"
						isDisabled
						label="Your answer"
						placeholder="Enter a number..."
						radius="sm"
						type="number"
						variant="bordered"
					/>
				);
			case "single":
				return (
					<div className="mt-2">
						<Checkbox isDisabled>Yes</Checkbox>
						<p className="mt-1 pl-6 text-gray-500 text-xs">
							Check if applicable
						</p>
					</div>
				);
			case "multiple":
				return (
					<div className="mt-2">
						<RadioGroup isDisabled>
							{question.options?.map((option) => (
								<Radio key={option} value={option}>
									{option}
								</Radio>
							))}
						</RadioGroup>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div className="mx-auto max-w-5xl">
			{/* Questions Builder */}
			<div className="mb-20 flex flex-col gap-4">
				{questions.map((question) => (
					<Card className="p-3 sm:p-5" key={question.id}>
						{/* Drag handle and delete button row */}
						<div className="flex w-full pb-2 sm:pb-3">
							<div className="flex w-[51%] justify-end">
								<button className="cursor-grab" type="button">
									<MdOutlineDragIndicator
										className="rotate-90 cursor-grab text-gray-400"
										size={25}
									/>
								</button>
							</div>
							<div className="flex w-[49%] justify-end pr-2">
								<Button
									color="danger"
									isIconOnly
									onClick={() => deleteQuestion(question.id)}
									size="sm"
									variant="flat"
								>
									<FaTrash size={13} />
								</Button>
							</div>
						</div>

						{/* Question Name and Type */}
						<div className="gap-4 sm:flex">
							<Input
								className="w-full"
								isRequired
								label="Question Name"
								onValueChange={(value) =>
									updateQuestion(question.id, "questionName", value)
								}
								radius="sm"
								value={question.questionName}
								variant="bordered"
							/>
							<Select
								className="mt-3 w-full sm:mt-0"
								defaultSelectedKeys={[question.questionType]}
								isRequired
								label="Question Type"
								onSelectionChange={(value) =>
									updateQuestion(
										question.id,
										"questionType",
										Array.from(value)[0] as QuestionType
									)
								}
								radius="sm"
								selectionMode="single"
								variant="bordered"
							>
								<SelectItem key="short">Short Text</SelectItem>
								<SelectItem key="long">Long Text</SelectItem>
								<SelectItem key="numeric">Numeric</SelectItem>
								<SelectItem key="single">Single Choice</SelectItem>
								<SelectItem key="multiple">Multiple Choice</SelectItem>
							</Select>
						</div>

						{/* Description and Options */}
						<div
							className={`${question.questionType === "multiple" && "md:flex md:gap-3"}`}
						>
							<div
								className={`${question.questionType === "multiple" && "md:w-[50%]"}`}
							>
								<Textarea
									className="mt-3 w-full"
									label="Description"
									onValueChange={(value) =>
										updateQuestion(question.id, "description", value)
									}
									radius="sm"
									size="sm"
									value={question.description}
									variant="bordered"
								/>
							</div>
							<div className="md:w-[50%]">
								{question.questionType === "multiple" && (
									<div className="flex flex-col pt-2">
										<div className="flex items-center justify-between pb-2">
											<p className="pl-1 text-small">Options</p>
											<div className="flex pr-3">
												<Button
													color="primary"
													isIconOnly
													onClick={() =>
														updateOptions(question.id, [
															...(question.options || []),
															"",
														])
													}
													size="sm"
													variant="flat"
												>
													<IoMdAddCircleOutline size={20} />
												</Button>
											</div>
										</div>
										<div className="grid grid-cols-2 gap-3">
											{question.options?.map((option, index) => (
												<Input
													className="w-full"
													endContent={
														<Button
															color="danger"
															isIconOnly
															onClick={() =>
																updateOptions(
																	question.id,
																	question.options?.filter(
																		(_, i) => i !== index
																	) || []
																)
															}
															size="sm"
															variant="flat"
														>
															<FaTrash size={13} />
														</Button>
													}
													key={`option-${question.id}-${index}`}
													label={`Option ${index + 1}`}
													onValueChange={(value) =>
														updateOptions(
															question.id,
															question.options?.map((_, i) =>
																i === index ? value : _
															) || []
														)
													}
													radius="sm"
													size="sm"
													value={option}
													variant="bordered"
												/>
											))}
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Display in table checkbox */}
						<Checkbox
							className="mt-2"
							isSelected={question.displayInTable}
							onValueChange={(e) =>
								updateQuestion(question.id, "displayInTable", e)
							}
							radius="sm"
						>
							Display in table
						</Checkbox>

						{/* Question Preview */}
						<div className="mt-4 rounded-lg bg-muted/20 p-4">
							<p className="mb-2 font-medium text-muted-foreground text-sm">
								Preview:
							</p>
							<h6 className="mb-1 font-medium">
								{question.questionName || "Question name..."}
							</h6>
							{question.description && (
								<p className="mb-2 text-muted-foreground text-sm">
									{question.description}
								</p>
							)}
							{renderQuestionPreview(question)}
						</div>
					</Card>
				))}
			</div>

			{/* Demo Notice */}
			<div className="mt-4 rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-950/20">
				<p className="text-blue-700 text-sm dark:text-blue-300">
					🎯 This is a interactive demo matching your real form builder!{" "}
					<Link className="font-semibold text-sm" href="/register">
						Sign up to create real forms
					</Link>
				</p>
			</div>
		</div>
	);
};
