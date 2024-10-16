"use client";

import { Button, Table, TableBody, TableCell } from "@nextui-org/react";
import { TableHeader, TableColumn, TableRow } from "@nextui-org/react";
import { popularFormsExamples, PopularFormsColumns } from "@/constants";

export const PopularFormsTable = () => {
	return (
		<div className="w-full flex justify-center">
			<Table
				aria-label="Admin Table"
				onSelectionChange={() => {}}
				radius="sm"
				color="primary"
				selectionMode="none"
				className="w-[95%] max-w-[1100px]"
				hideHeader
			>
				<TableHeader columns={PopularFormsColumns}>
					{(column) => (
						<TableColumn key={column.key}>{column.label}</TableColumn>
					)}
				</TableHeader>
				<TableBody>
					{popularFormsExamples.map((item, index) => (
						<TableRow key={item.position}>
							<TableCell className="px-2 sm:px-3 sm:text-2xl lg:text-6xl font-semibold sm:w-[15%]">
								<div
									className={`sm:flex sm:justify-center ${index + 1 === 1 ? "text-yellow-500" : index + 1 === 2 ? "text-gray-500 brightness-150" : index + 1 === 3 ? "text-yellow-800" : ""}`}
								>
									#{index + 1}
								</div>
							</TableCell>
							<TableCell className="sm:p-4 sm:flex sm:flex-col gap-1">
								<p className=" font-semibold sm:text-xl md:text-2xl lg:text-3xl">
									{item.body.title}
								</p>
								<div className="pt-1">
									<span className="pr-3 sm:pr-10 opacity-60 lg:text-lg">
										{item.body.answers} answers
									</span>
									<span className="opacity-60  lg:text-lg">
										By {item.body.author}
									</span>
								</div>
							</TableCell>
							<TableCell className="pl-3 pr-0 sm:p-0 sm:w-[30%]">
								<Button
									size="sm"
									color="primary"
									variant="flat"
									className="sm:mx-auto sm:w-[80%] sm:h-12 sm:flex sm:font-semibold"
								>
									Answer
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
