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
		<div ref={setNodeRef} style={style} key={id}>
			<Card className="p-3 sm:p-5">
				<div className="flex w-full pb-2 sm:pb-3">
					<div className="w-[51%] flex justify-end">
						<button
							{...attributes}
							{...listeners}
							className={` ${isCursorGrabbing ? "cursor-grabbing" : "cursor-grab"}`}
						>
							<MdOutlineDragIndicator
								className="cursor-grab rotate-90"
								size={25}
							/>
						</button>
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
						isRequired
						radius="sm"
						variant="bordered"
						className="w-full"
						label={t("questionName")}
						value={questionName}
						onValueChange={(value) =>
							onQuestionChange(id, "questionName", value)
						}
					/>
					<Select
						isRequired
						isDisabled={disableType}
						radius="sm"
						defaultSelectedKeys={[questionType]}
						label={t("questionType")}
						variant="bordered"
						selectionMode="single"
						className="w-full mt-3 sm:mt-0"
						onSelectionChange={(value) =>
							onQuestionChange(id, "questionType", value.anchorKey ?? "short")
						}
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
							size="sm"
							radius="sm"
							variant="bordered"
							label={t("description")}
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
									<p className="pl-1 text-small">{t("options")}</p>
									<div className="flex pr-3">
										<Button
											variant="flat"
											color="primary"
											size="sm"
											isIconOnly
											isDisabled={disableType}
											onClick={() => onOptionsChange(id, [...options, ""])}
										>
											<IoMdAddCircleOutline size={20} />
										</Button>
									</div>
								</div>
								<div className="grid grid-cols-2 gap-3">
									{options.map((option, index) => (
										<Input
											isDisabled={disableType}
											key={`option-${id}-${
												// biome-ignore lint/suspicious/noArrayIndexKey: <Neded for nextui>
												index
											}`}
											size="sm"
											radius="sm"
											variant="bordered"
											className="w-full"
											label={`${t("option")} ${index + 1}`}
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
					{t("displayInTable")}
				</Checkbox>
			</Card>
		</div>
	);
};
