"use client";

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	Spinner,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	getKeyValue,
} from "@nextui-org/react";
import type { FilledForms, ModalWithFillFormsProps } from "@/interfaces";
import { useEffect, useState, type FC } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { getFilledForms } from "@/services/filledForms/getFilledForms";

export const ModalWithFillForms: FC<ModalWithFillFormsProps> = ({
	formId,
	isOpen,
	onOpenChange,
}) => {
	const [isModalLoading, setIsModalLoading] = useState(false);
	const [formData, setFormData] = useState<FilledForms[]>([]);

	const t = useTranslations("modalFilledForms");

	const router = useRouter();

	useEffect(() => {
		if (isOpen && formId) {
			const fetchFormData = async () => {
				setIsModalLoading(true);
				try {
					const data = await getFilledForms(formId);
					setFormData(data);
				} catch (error) {
					console.error("Error fetching form data:", error);
				} finally {
					setIsModalLoading(false);
				}
			};

			fetchFormData();
		}
	}, [isOpen, formId]);

	const TableColumns = [
		{ key: "userName", label: t("userName") },
		{ key: "filledAt", label: t("filledAt") },
	];

	const gotoForm = (userId: number) => {
		if (!userId) return;
		router.push(`/filled-form/${formId}/${userId}`);
	};

	return (
		<Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							<h3 className="text-lg font-semibold text-center">
								{t("title")}
							</h3>
						</ModalHeader>
						<ModalBody>
							<div className="w-full flex justify-center">
								<Table
									aria-label="Admin Table"
									//@ts-ignore
									onSelectionChange={(keys) => gotoForm([...keys][0])}
									radius="md"
									color="primary"
									selectionMode="single"
									className="max-w-[300px]"
								>
									<TableHeader columns={TableColumns}>
										{(column) => (
											<TableColumn key={column.key}>{column.label}</TableColumn>
										)}
									</TableHeader>
									<TableBody
										isLoading={isModalLoading}
										items={formData}
										loadingContent={<Spinner size="lg" label="Loading..." />}
									>
										{(item) => (
											<TableRow key={item.userId} className="cursor-pointer">
												{(columnKey) => (
													<TableCell>{getKeyValue(item, columnKey)}</TableCell>
												)}
											</TableRow>
										)}
									</TableBody>
								</Table>
							</div>
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
