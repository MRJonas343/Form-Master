"use client";

import { Input, Textarea, Select, Checkbox } from "@nextui-org/react";
import { Button, SelectItem, Card } from "@nextui-org/react";
import { MdOutlineDragIndicator } from "react-icons/md";
import type { QuestionElementProps } from "@/interfaces";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import type { FC } from "react";

export const QuestionContainer: FC<QuestionElementProps> = ({
	id,
	questionName,
	questionType,
	description,
	onQuestionChange,
	deleteQuestion,
	displayInTable,
	onOptionsChange,
	options = [],
}) => {
	return (
		<Card className="p-3 sm:p-5">
			<div className="flex w-full pb-2 sm:pb-3">
				<div className="w-[51%] flex justify-end">
					<MdOutlineDragIndicator className="cursor-grab rotate-90" size={25} />
				</div>
				<div className="w-[49%] flex justify-end pr-2">
					<Button
						variant="flat"
						color="danger"
						size="sm"
						isIconOnly
						onClick={() => deleteQuestion(id)}
					>
						<FaTrash size={13} />
					</Button>
				</div>
			</div>

			<div className="sm:flex gap-4">
				<Input
					radius="sm"
					variant="bordered"
					className="w-full"
					label="Question Name"
					value={questionName}
					onValueChange={(value) => onQuestionChange(id, "questionName", value)}
				/>
				<Select
					radius="sm"
					label="Type"
					variant="bordered"
					selectionMode="single"
					className="w-full mt-3 sm:mt-0"
					onSelectionChange={(value) =>
						onQuestionChange(id, "questionType", value.anchorKey ?? "short")
					}
				>
					<SelectItem key="short">Short</SelectItem>
					<SelectItem key="long">Long</SelectItem>
					<SelectItem key="numeric">Numeric</SelectItem>
					<SelectItem key="single">Single</SelectItem>
					<SelectItem key="multiple">Multiple</SelectItem>
				</Select>
			</div>
			<div className={`${questionType === "multiple" && "md:flex md:gap-3"}`}>
				<div className={`${questionType === "multiple" && "md:w-[50%]"}`}>
					<Textarea
						size="sm"
						radius="sm"
						variant="bordered"
						label="Add a description for this question"
						className="w-full mt-3"
						value={description}
						onValueChange={(value) =>
							onQuestionChange(id, "description", value)
						}
					/>
				</div>
				<div className="md:w-[50%]">
					{questionType === "multiple" && (
						<div className="flex flex-col pt-2 ">
							<div className="flex justify-between items-center pb-2">
								<p className="pl-1 text-small">Options</p>
								<div className="flex pr-3">
									<Button
										variant="flat"
										color="primary"
										size="sm"
										isIconOnly
										onClick={() => onOptionsChange(id, [...options, ""])}
									>
										<IoMdAddCircleOutline size={20} />
									</Button>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-3">
								{options.map((option, index) => (
									<Input
										key={`option-${id}-${
											// biome-ignore lint/suspicious/noArrayIndexKey: <Neded for nextui>
											index
										}`}
										size="sm"
										radius="sm"
										variant="bordered"
										className="w-full"
										label={`Option ${index + 1}`}
										value={option}
										onValueChange={(value) =>
											onOptionsChange(
												id,
												options.map((_, i) => (i === index ? value : _)),
											)
										}
										endContent={
											<Button
												variant="flat"
												color="danger"
												size="sm"
												isIconOnly
												onClick={() =>
													onOptionsChange(
														id,
														options.filter((_, i) => i !== index),
													)
												}
											>
												<FaTrash size={13} />
											</Button>
										}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			<Checkbox
				radius="sm"
				className="mt-2"
				isSelected={displayInTable}
				onValueChange={(e) => onQuestionChange(id, "displayInTable", e)}
			>
				Display in your form table
			</Checkbox>
		</Card>
	);
};
