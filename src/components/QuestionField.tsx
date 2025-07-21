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
import type { FC } from "react";
import type { AnswerProps } from "@/interfaces/question";

interface QuestionFieldProps {
	isDisabled: boolean;
	question: AnswerProps;
	updateValue: (id: number, value: string | boolean | number) => void;
}

export const QuestionField: FC<QuestionFieldProps> = ({
	isDisabled,
	question,
	updateValue,
}) => {
	return (
		<Card className="w-full max-w-[800px] mx-auto flex flex-col">
			<CardHeader>
				<p className="text-md font-semibold">{question.question}</p>
			</CardHeader>
			<Divider />
			<CardBody>
				{question.type === "long" && (
					<Textarea
						isDisabled={isDisabled}
						radius="sm"
						color="primary"
						variant="bordered"
						label={"Tu respuesta"}
						value={question.value?.toString() || ""}
						onValueChange={(value) => updateValue(question.id, value)}
						description={question.description}
					/>
				)}
				{question.type === "short" && (
					<Input
						isDisabled={isDisabled}
						radius="sm"
						color="primary"
						variant="bordered"
						label={"Tu respuesta"}
						value={question.value?.toString() || ""}
						onValueChange={(value) => updateValue(question.id, value)}
						description={question.description}
					/>
				)}

				{question.type === "numeric" && (
					<Input
						isDisabled={isDisabled}
						radius="sm"
						color="primary"
						variant="bordered"
						label={"Tu respuesta"}
						value={question.value?.toString() || ""}
						onValueChange={(value) => {
							if (value.match(/^[0-9]*$/)) updateValue(question.id, value);
						}}
						description={question.description}
					/>
				)}
				{question.type === "single" && (
					<>
						<Checkbox
							isDisabled={isDisabled}
							isSelected={Boolean(question.value)}
							onValueChange={(isSelected) =>
								updateValue(question.id, isSelected)
							}
						>
							Yes
						</Checkbox>
						<span className="text-xs text-gray-500 pt-1 pl-1">
							{question.description}
						</span>
					</>
				)}
				{question.type === "multiple" && (
					<div className="flex flex-col gap-2">
						<RadioGroup
							isDisabled={isDisabled}
							label={question.question}
							value={question.value?.toString() || ""}
							onValueChange={(value) => updateValue(question.id, value)}
						>
							{question.options?.map((option) => (
								<Radio isDisabled={isDisabled} key={option} value={option}>
									{option}
								</Radio>
							))}
						</RadioGroup>
						<span className="text-xs text-gray-500 pl-2">
							{question.description}
						</span>
					</div>
				)}
			</CardBody>
		</Card>
	);
};
