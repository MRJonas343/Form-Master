"use client";

import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import { PopularFormsColumns } from "@/constants";
import type { PopularForms } from "@/interfaces";

export const PopularFormsTable: FC<PopularForms> = ({ popularForms }) => {
	const router = useRouter();

	const t = useTranslations("popularFormsTable");

	return (
		<div className="flex w-full justify-center">
			<Table
				aria-label="Admin Table"
				className="w-[95%] max-w-[1100px]"
				color="primary"
				hideHeader
				radius="sm"
				selectionMode="none"
			>
				<TableHeader columns={PopularFormsColumns}>
					{(column) => (
						<TableColumn key={column.key}>{column.label}</TableColumn>
					)}
				</TableHeader>
				<TableBody>
					{popularForms.map((form, index) => (
						<TableRow key={form.id}>
							<TableCell className="px-2 font-semibold sm:w-[15%] sm:px-3 sm:text-2xl lg:text-6xl">
								<div
									className={`sm:flex sm:justify-center ${index + 1 === 1 ? "text-yellow-500" : index + 1 === 2 ? "text-gray-500 brightness-150" : index + 1 === 3 ? "text-yellow-800" : ""}`}
								>
									#{index + 1}
								</div>
							</TableCell>
							<TableCell className="gap-1 sm:flex sm:flex-col sm:p-4">
								<p className="font-semibold sm:text-xl md:text-2xl lg:text-3xl">
									{form.title}
								</p>
								<div className="pt-1">
									<span className="pr-3 opacity-60 sm:pr-10 lg:text-lg">
										{form.answerTimes} {t("answers")}
									</span>
									<span className="opacity-60 lg:text-lg">
										{t("by")} {form.authorName}
									</span>
								</div>
							</TableCell>
							<TableCell className="pr-0 pl-3 sm:w-[30%] sm:p-0">
								<Button
									className="sm:mx-auto sm:flex sm:h-12 sm:w-[80%] sm:font-semibold"
									color="primary"
									onClick={() => router.push(`/form/${form.id}`)}
									size="sm"
									variant="flat"
								>
									{t("answer")}
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
