"use client";

import { Button, Card, Input } from "@nextui-org/react";
import type { Comment } from "@/interfaces";
import { IoMdSend } from "react-icons/io";
import { useState } from "react";
import { createComment } from "@/services/comments/createComment";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

interface CommentsSectionProps {
	formId: number | undefined;
	comments: Comment[];
}

export const CommentsSection = ({ comments, formId }: CommentsSectionProps) => {
	const { data: session } = useSession();

	const [comment, setComment] = useState("");
	const t = useTranslations("commentsSection");

	const uploadComment = async () => {
		if (!comment) return;
		await createComment(
			formId ?? 0,
			Number.parseInt(session?.user?.id ?? ""),
			comment,
		);

		setComment("");
	};

	return (
		<>
			<h2 className="text-lg font-semibold text-center mt-4 mb-2">
				{t("comments")}
			</h2>
			<Card className="w-full max-w-[800px] mx-auto flex flex-col p-4">
				<div className="w-full flex mb-2">
					<Input
						radius="sm"
						placeholder={t("addComment")}
						value={comment}
						isDisabled={!session}
						onValueChange={setComment}
					/>
					<Button
						radius="sm"
						variant="flat"
						color="primary"
						isDisabled={!session}
						className="ml-2"
						onClick={uploadComment}
						isIconOnly
					>
						<IoMdSend size={20} />
					</Button>
				</div>
				{comments.map((comment) => (
					<div className="flex flex-col pb-3 px-1" key={comment.id}>
						<p className="text-sm text-gray-500">{comment.userName}</p>
						<p className="text-sm">{comment.comment}</p>
					</div>
				))}
			</Card>
		</>
	);
};
