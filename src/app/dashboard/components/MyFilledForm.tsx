"use client";

import {
	getKeyValue,
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { FilledFormsColumns } from "@/constants";
import { type GenericItem, useSortableList } from "@/hooks/useSortableList";
import type { FilledForm } from "@/interfaces";

export const MyFilledForm = ({
	filledForms,
}: {
	filledForms: FilledForm[];
}) => {
	const { isLoading, list } = useSortableList({
		items: filledForms as unknown as GenericItem[],
	});

	const router = useRouter();

	const t = useTranslations("myFilledFormsTable");

	const { data: session } = useSession();

	const gotoForm = (formId: number) => {
		if (!formId || !session?.user) return;
		router.push(`/filled-form/${formId}/${session.user.id}`);
	};

	const tableColumns = [
		{ key: "formName", label: t("formName") },
		{ key: "topic", label: t("topic") },
		{ key: "filledAt", label: t("filledAt") },
	];

	return (
		<>
			<section className="w-full flex justify-center mt-3">
				<Table
					aria-label="Admin Table"
					//@ts-ignore
					onSelectionChange={(keys) => gotoForm([...keys][0])}
					radius="md"
					color="primary"
					selectionMode="single"
					className="w-[95%] max-w-[1280px]"
					sortDescriptor={list.sortDescriptor}
					onSortChange={list.sort}
				>
					<TableHeader columns={tableColumns}>
						{(column) => (
							<TableColumn className="lg:text-lg" key={column.key}>
								{t(column.key)}
							</TableColumn>
						)}
					</TableHeader>
					<TableBody
						emptyContent="No filled forms found"
						items={list.items}
						isLoading={isLoading}
						loadingContent={<Spinner size="lg" label="Loading..." />}
					>
						{(item) => (
							<TableRow
								key={item.formId as React.Key}
								className="cursor-pointer"
							>
								{(columnKey) => (
									<TableCell>{getKeyValue(item, columnKey)}</TableCell>
								)}
							</TableRow>
						)}
					</TableBody>
				</Table>
			</section>
		</>
	);
};
