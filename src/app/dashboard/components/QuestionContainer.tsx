"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
	Button,
	Card,
	Checkbox,
	Input,
	Select,
	SelectItem,
	Textarea,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import { FaTrash } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineDragIndicator } from "react-icons/md";
import type { QuestionElementProps } from "@/interfaces";

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
	disableType,
}) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const isCursorGrabbing = attributes["aria-pressed"];
	const t = useTranslations("setQuestions");

	return (
		<div key={id} ref={setNodeRef} style={style}>
			<Card className="p-3 sm:p-5">
				<div className="flex w-full pb-2 sm:pb-3">
					<div className="flex w-[51%] justify-end">
						<button
							{...attributes}
							{...listeners}
							className={` ${isCursorGrabbing ? "cursor-grabbing" : "cursor-grab"}`}
						>
							<MdOutlineDragIndicator
								className="rotate-90 cursor-grab"
								size={25}
							/>
						</button>
					</div>
					<div className="flex w-[49%] justify-end pr-2">
						<Button
							color="danger"
							isIconOnly
							onClick={() => deleteQuestion(id)}
							size="sm"
							variant="flat"
						>
							<FaTrash size={13} />
						</Button>
					</div>
				</div>

				<div className="gap-4 sm:flex">
					<Input
						className="w-full"
						isRequired
						label={t("questionName")}
						onValueChange={(value) =>
							onQuestionChange(id, "questionName", value)
						}
						radius="sm"
						value={questionName}
						variant="bordered"
					/>
					<Select
						className="mt-3 w-full sm:mt-0"
						defaultSelectedKeys={[questionType]}
						isDisabled={disableType}
						isRequired
						label={t("questionType")}
						onSelectionChange={(value) =>
							onQuestionChange(id, "questionType", value.anchorKey ?? "short")
						}
						radius="sm"
						selectionMode="single"
						variant="bordered"
					>
						<SelectItem key="short">{t("short")}</SelectItem>
						<SelectItem key="long">{t("long")}</SelectItem>
						<SelectItem key="numeric">{t("numeric")}</SelectItem>
						<SelectItem key="single">{t("single")}</SelectItem>
						<SelectItem key="multiple">{t("multiple")}</SelectItem>
					</Select>
				</div>
				<div className={`${questionType === "multiple" && "md:flex md:gap-3"}`}>
					<div className={`${questionType === "multiple" && "md:w-[50%]"}`}>
						<Textarea
							className="mt-3 w-full"
							label={t("description")}
							onValueChange={(value) =>
								onQuestionChange(id, "description", value)
							}
							radius="sm"
							size="sm"
							value={description}
							variant="bordered"
						/>
					</div>
					<div className="md:w-[50%]">
						{questionType === "multiple" && (
							<div className="flex flex-col pt-2">
								<div className="flex items-center justify-between pb-2">
									<p className="pl-1 text-small">{t("options")}</p>
									<div className="flex pr-3">
										<Button
											color="primary"
											isDisabled={disableType}
											isIconOnly
											onClick={() => onOptionsChange(id, [...options, ""])}
											size="sm"
											variant="flat"
										>
											<IoMdAddCircleOutline size={20} />
										</Button>
									</div>
								</div>
								<div className="grid grid-cols-2 gap-3">
									{options.map((option, index) => (
										<Input
											className="w-full"
											endContent={
												<Button
													color="danger"
													isIconOnly
													onClick={() =>
														onOptionsChange(
															id,
															options.filter((_, i) => i !== index)
														)
													}
													size="sm"
													variant="flat"
												>
													<FaTrash size={13} />
												</Button>
											}
											isDisabled={disableType}
											key={`option-${id}-${
												// biome-ignore lint/suspicious/noArrayIndexKey: <Neded for nextui>
												index
											}`}
											label={`${t("option")} ${index + 1}`}
											onValueChange={(value) =>
												onOptionsChange(
													id,
													options.map((_, i) => (i === index ? value : _))
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

				<Checkbox
					className="mt-2"
					isSelected={displayInTable}
					onValueChange={(e) => onQuestionChange(id, "displayInTable", e)}
					radius="sm"
				>
					{t("displayInTable")}
				</Checkbox>
			</Card>
		</div>
	);
};
