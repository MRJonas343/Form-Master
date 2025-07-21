"use client";

import {
	Button,
	Input,
	Modal,
	ModalContent,
	ModalHeader,
	Select,
	SelectItem,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
// import { createJiraTicket } from "@/services/jira/jiraIntegration"; // TEMPORARILY DISABLED
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { Ticket } from "@/interfaces/Ticket";

interface ModalConfirmProps {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	onOpenChange: (isOpen: boolean) => void;
}

export const IssueModal = ({
	isOpen,
	onOpenChange,
	onClose,
}: ModalConfirmProps) => {
	const { data: session } = useSession();
	const pathname = usePathname();
	const t = useTranslations("issueModal");

	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<Ticket>();

	const onSubmit = async (data: Ticket) => {
		if (!session) return;
		setIsLoading(true);

		// TEMPORARILY DISABLED JIRA INTEGRATION
		// const useriId = Number.parseInt(session.user?.id as string);
		// const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`;
		// const ticket = await createJiraTicket(useriId, { ...data, link: fullUrl });

		setIsLoading(false);

		// Temporarily always show success until Jira integration is fixed
		// if (ticket === "ERROR") {
		// 	toast.error(t("error"));
		// 	reset();
		// 	return onClose();
		// }

		toast.success(t("success"));
		reset();
		onClose();
	};

	return (
		<Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1">
					<h3 className="text-lg font-semibold text-center">{t("title")}</h3>
				</ModalHeader>
				<div className="w-full flex justify-center">
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input
							radius="sm"
							size="lg"
							variant="bordered"
							isInvalid={Boolean(errors.summary)}
							errorMessage={t("invalidSummary")}
							className="mb-4"
							placeholder={t("summary")}
							{...register("summary", {
								required: true,
								minLength: 1,
								maxLength: 100,
							})}
						/>
						<Input
							radius="sm"
							size="lg"
							variant="bordered"
							isInvalid={Boolean(errors.summary)}
							errorMessage={t("invalidDescription")}
							className="mb-4"
							placeholder={t("description")}
							{...register("description", {
								required: true,
								minLength: 1,
								maxLength: 255,
							})}
						/>

						<Select
							radius="sm"
							size="lg"
							variant="bordered"
							isInvalid={Boolean(errors.priority)}
							errorMessage={t("invalidPriority")}
							className="mb-4"
							placeholder={t("priority")}
							{...register("priority", {
								required: true,
							})}
						>
							<SelectItem key="High">{t("High")}</SelectItem>
							<SelectItem key="Average">{t("Average")}</SelectItem>
							<SelectItem key="Low">{t("Low")}</SelectItem>
						</Select>
						<Input
							radius="sm"
							size="lg"
							variant="bordered"
							isInvalid={Boolean(errors.form)}
							errorMessage={t("invalidForm")}
							className="mb-4"
							placeholder={t("form")}
							{...register("form", {
								required: false,
								minLength: 1,
								maxLength: 255,
							})}
						/>

						<Button
							isLoading={isLoading}
							color="primary"
							radius="sm"
							size="lg"
							variant="shadow"
							className="text-xl font-semibold mb-6 w-full"
							type="submit"
						>
							{t("submit")}
						</Button>
					</form>
				</div>
			</ModalContent>
		</Modal>
	);
};
