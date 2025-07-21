"use client";

import {
	Card,
	CardBody,
	CardHeader,
	Checkbox,
	Divider,
	Input,
	Radio,
	RadioGroup,
	Textarea,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import type { FC } from "react";
import type { FilledQuestionProps, Question } from "@/interfaces";

const FilledQuestion: FC<FilledQuestionProps> = ({
	id,
	answer,
	question,
	options,
	type,
	value,
	description,
	updateValue,
}) => {
	const { data: session } = useSession();

	return (
		<Card className="w-full max-w-[800px] mx-auto flex flex-col">
			<CardHeader>
				<p className="text-md font-semibold">{question as string}</p>
			</CardHeader>
			<Divider />
			<CardBody>
				{type === "long" && (
					<Textarea
						isDisabled={session?.user.role !== "admin"}
						radius="sm"
						color="primary"
						variant="bordered"
						label={"Tu respuesta"}
						value={answer as string}
						onValueChange={(value) => updateValue(id, value)}
						description={description}
					/>
				)}
				{type === "short" && (
					<Input
						radius="sm"
						color="primary"
						variant="bordered"
						label={"Tu respuesta"}
						value={answer as string}
						onValueChange={(value) => updateValue(id, value)}
						description={description}
						isDisabled={session?.user.role !== "admin"}
					/>
				)}

				{type === "numeric" && (
					<Input
						isDisabled={session?.user.role !== "admin"}
						radius="sm"
						color="primary"
						variant="bordered"
						label={"Tu respuesta"}
						value={(answer as string) || ""}
						description={description}
						onValueChange={(value) => {
							if (value.match(/^[0-9]*$/)) updateValue(id, value);
						}}
					/>
				)}
				{type === "single" && (
					<>
						<Checkbox
							isDisabled={session?.user.role !== "admin"}
							isSelected={answer as boolean}
							onValueChange={(value) => updateValue(id, value)}
						>
							Yes
						</Checkbox>
						<span className="text-xs text-gray-500 pt-1 pl-1">
							{description}
						</span>
					</>
				)}
				{type === "multiple" && (
					<div className="flex flex-col gap-2">
						<RadioGroup
							isDisabled={session?.user.role !== "admin"}
							label={question}
							value={answer as string}
							onValueChange={(value) => updateValue(id, value)}
						>
							{options?.map((option) => (
								<Radio
									isDisabled={session?.user.role !== "admin"}
									key={option as string}
									value={option as string}
								>
									{option as string}
								</Radio>
							))}
						</RadioGroup>
						<span className="text-xs text-gray-500 pl-2">{description}</span>
					</div>
				)}
			</CardBody>
		</Card>
	);
};
export default FilledQuestion;
