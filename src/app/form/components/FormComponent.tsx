"use client";

import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Checkbox,
	Divider,
	Image,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { type FC, useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import {
	CommentsSection,
	CustomHeartIcon,
	MarkdownRenderArea,
	QuestionField,
} from "@/components";
import type { FormProps } from "@/interfaces";
import { formInitialState, formReducer } from "../store/state";
import { submitForm, updateValue } from "../utils/formComponentHandlers";

export const FormComponent: FC<FormProps> = ({
	questions,
	formGeneralData,
	comments,
	isReadOnly,
}) => {
	const [state, dispatch] = useReducer(
		formReducer,
		questions,
		formInitialState,
	);

	const { data: session } = useSession();

	const t = useTranslations("formSection");

	const router = useRouter();

	useEffect(() => {
		if (!session) {
			toast("You are in read only mode, please login to fill the form", {
				duration: 5000,
			});
		}
	}, []);

	return (
		<>
			<section className="flex w-[95%] mx-auto mt-5 flex-col gap-4 mb-10">
				<Card className="w-full max-w-[800px] mx-auto flex flex-col">
					<CardHeader className="flex gap-3">
						<Image
							alt={formGeneralData.title}
							height={40}
							radius="sm"
							src={formGeneralData.imageUrl}
							width={40}
						/>

						<p className="text-md font-semibold">{formGeneralData.title}</p>
					</CardHeader>
					<Divider />
					<CardBody>
						<MarkdownRenderArea>
							{formGeneralData.description}
						</MarkdownRenderArea>
					</CardBody>
				</Card>
				{state.questionsState.map((question) => (
					<QuestionField
						key={question.id}
						isDisabled={isReadOnly}
						question={question}
						updateValue={(questionId, value) =>
							updateValue(questionId, value, state, dispatch)
						}
					/>
				))}

				<div className="w-full max-w-[800px] mx-auto flex flex-col gap-4">
					<Checkbox
						isDisabled={isReadOnly}
						className="px-3"
						isSelected={state.shouldSendCopy}
						onValueChange={(value) =>
							dispatch({
								type: "SET_SHOULD_SEND_COPY",
								payload: value,
							})
						}
					>
						{t("sendCopy")}
					</Checkbox>

					<Checkbox
						isDisabled={isReadOnly}
						className="px-3"
						icon={<CustomHeartIcon />}
						color="danger"
						isSelected={state.isFormLiked}
						onValueChange={(value) =>
							dispatch({ type: "SET_IS_FORM_LIKED", payload: value })
						}
					>
						{t("likeForm")}
					</Checkbox>

					<Button
						isDisabled={isReadOnly}
						onClick={() =>
							submitForm(formGeneralData, state, dispatch, router, session)
						}
						isLoading={state.isSubmitting}
						variant="shadow"
						color="primary"
						radius="sm"
						className="text-lg font-semibold"
					>
						{t("submitForm")}
					</Button>
				</div>

				<Divider className="mt-4" />

				<CommentsSection formId={formGeneralData.id} comments={comments} />
			</section>
		</>
	);
};
