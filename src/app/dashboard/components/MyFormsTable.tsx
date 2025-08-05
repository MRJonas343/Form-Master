"use client";

import {
	Button,
	getKeyValue,
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { type FC, useRef } from "react";
import toast from "react-hot-toast";
import { GoGraph } from "react-icons/go";
import { LuFileSpreadsheet } from "react-icons/lu";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { MyFormsColumns } from "@/constants";
import { type GenericItem, useSortableList } from "@/hooks/useSortableList";
import type { MyFormsTableProps } from "@/interfaces";
import { deleteFormAction } from "@/services/forms/deleteForm";
import { ModalWithFillForms } from "./ModalWithFillForms";

export const MyFormsTable: FC<MyFormsTableProps> = ({ forms }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const { isLoading, list, setItems } = useSortableList({
		items: forms as unknown as GenericItem[],
	});

	const formIdRef = useRef(0);
	const router = useRouter();

	const t = useTranslations("myFormsTable");

	const deleteForm = async (formId: number) => {
		const result = await deleteFormAction(formId);

		//@ts-expect-error
		setItems(forms.filter((form) => form.formId !== formId));
		if (result === "SUCCESS") toast.success("Form deleted successfully");
	};

	return (
		<>
			<div className="mx-auto mt-4 flex w-full max-w-[1280px] justify-end gap-2 px-5 sm:mt-0 sm:w-[95%] sm:justify-end">
				<Button
					color="primary"
					isIconOnly
					onPress={() => router.push("/dashboard/new-form")}
					radius="sm"
					variant="shadow"
				>
					<MdAdd size={28} />
				</Button>
				<Button
					color="primary"
					isIconOnly
					onPress={() =>
						formIdRef.current !== 0 && formIdRef.current && onOpen()
					}
					radius="sm"
					variant="bordered"
				>
					<LuFileSpreadsheet size={20} />
				</Button>
				<Button
					color="primary"
					isIconOnly
					onPress={() =>
						formIdRef.current !== 0 &&
						formIdRef.current &&
						router.push(`/dashboard/results/${formIdRef.current}`)
					}
					radius="sm"
					variant="bordered"
				>
					<GoGraph size={20} />
				</Button>
				<Button
					color="primary"
					isIconOnly
					onClick={() => {
						formIdRef.current !== 0 &&
							formIdRef.current &&
							router.push(`/dashboard/edit-form/${formIdRef.current}`);
					}}
					radius="sm"
					variant="bordered"
				>
					<MdEdit size={20} />
				</Button>

				<Button
					color="danger"
					isIconOnly
					onPress={() => deleteForm(formIdRef.current)}
					radius="sm"
					variant="bordered"
				>
					<MdDelete size={20} />
				</Button>
			</div>
			<div className="mt-5 flex w-full justify-center">
				<Table
					aria-label="Admin Table"
					className="w-[95%] max-w-[1280px]"
					color="primary"
					onSelectionChange={(keys) => {
						//@ts-expect-error
						formIdRef.current = [...keys][0];
					}}
					onSortChange={list.sort}
					radius="md"
					selectionMode="single"
					sortDescriptor={list.sortDescriptor}
				>
					<TableHeader columns={MyFormsColumns}>
						<TableColumn allowsSorting className="lg:text-lg" key="formName">
							{t("formName")}
						</TableColumn>
						<TableColumn allowsSorting className="lg:text-lg" key="topic">
							{t("topic")}
						</TableColumn>
						<TableColumn allowsSorting className="lg:text-lg" key="questions">
							{t("questions")}
						</TableColumn>
					</TableHeader>
					<TableBody
						emptyContent="No forms found"
						isLoading={isLoading}
						items={list.items}
						loadingContent={<Spinner label="Loading..." size="lg" />}
					>
						{(item) => (
							<TableRow key={item.formId as React.Key}>
								{(columnKey) => (
									<TableCell className="lg:text-lg">
										{columnKey === "questions" ? (
											<ul className="list-inside list-disc">
												{/* @ts-ignore */}
												{item.questions?.map((question) => (
													<li key={question}>
														{question || "No question available"}
													</li>
												))}
											</ul>
										) : (
											getKeyValue(item, columnKey)
										)}
									</TableCell>
								)}
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<ModalWithFillForms
				formId={formIdRef.current}
				isOpen={isOpen}
				onOpen={onOpen}
				onOpenChange={onOpenChange}
			/>
		</>
	);
};
