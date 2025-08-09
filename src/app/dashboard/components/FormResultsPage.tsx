"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import { ScrollShadow } from "@nextui-org/react";
import { Download } from "lucide-react";
import { CSVLink } from "react-csv";
import { BarChart } from "@/components";
import { DonutChart } from "@/components/DonuChart";
import type { FormeResults } from "@/interfaces";
import {
	formatDataForBarChart,
	formatDataForNumericBarChart,
	formatDataForPieChart,
} from "../utils";
import { prepareCSVData } from "../utils/CSV-export";

export const FormResultsPage = ({ data }: { data: FormeResults[] }) => {
	const csvData = prepareCSVData(data);
	const csvHeaders = [
		{ label: "Question", key: "Question" },
		{ label: "Type", key: "Type" },
		{ label: "Option", key: "Option" },
		{ label: "Count", key: "Count" },
		{ label: "Answer", key: "Answer" },
		{ label: "Answer Index", key: "Answer Index" },
	];

	return (
		<div className="mx-auto mb-10 flex w-[95%] flex-col">
			{/* Export Button */}
			<div className="mt-5 mb-6 flex justify-start">
				<CSVLink
					data={csvData}
					filename={`form-results-${new Date().toISOString().split("T")[0]}.csv`}
					headers={csvHeaders}
				>
					<Button
						color="primary"
						radius="sm"
						startContent={<Download size={16} />}
						variant="shadow"
					>
						Export to CSV
					</Button>
				</CSVLink>
			</div>
			{data.map((questionData) => (
				<div className="mt-4 mb-4" key={questionData.questionId}>
					<h3 className="mb-4 text-center font-semibold text-lg lg:text-2xl">
						{questionData.question}
					</h3>

					{questionData.type === "multiple" && (
						<div className="flex w-full justify-center">
							<BarChart
								categories={["Count"]}
								className="h-80 w-full max-w-[1280px]"
								data={formatDataForBarChart(questionData)}
								index="option"
								valueFormatter={(value: number) => `${value}`}
							/>
						</div>
					)}
					{questionData.type === "single" && (
						<div className="flex w-full flex-col items-center">
							<div className="mb-4 flex gap-2">
								<div className="flex items-center gap-2">
									No <div className="h-3 w-3 rounded-sm bg-[#10b981]" />
								</div>
								<div className="flex items-center gap-2">
									Yes <div className="h-3 w-3 rounded-sm bg-[#3b82f6]" />
								</div>
							</div>
							<DonutChart
								category="name"
								data={formatDataForPieChart(questionData)}
								value="amount"
								variant="pie"
							/>
						</div>
					)}
					{questionData.type === "numeric" && (
						<div className="flex w-full justify-center">
							<BarChart
								categories={["Count"]}
								className="h-80 w-full max-w-[1280px]"
								data={formatDataForNumericBarChart(questionData)}
								index="number"
								valueFormatter={(value: number) => `${value}`}
							/>
						</div>
					)}
					{questionData.type === "long" && (
						<div className="flex w-full justify-center">
							<ScrollShadow className="h-[400px] w-[95%] max-w-[1280px]">
								<Accordion variant="light">
									{questionData.answers.map((answer, index) => {
										return (
											<AccordionItem
												aria-label={`Answer: ${index}`}
												key={index as number}
												title={`Answer ${index}`}
											>
												{answer}
											</AccordionItem>
										);
									})}
								</Accordion>
							</ScrollShadow>
						</div>
					)}
					{questionData.type === "short" && (
						<div className="flex w-full justify-center">
							<ScrollShadow className="h-[400px] w-[95%] max-w-[1280px]">
								<Accordion variant="light">
									{questionData.answers.map((answer, index) => {
										return (
											<AccordionItem
												aria-label={`Answer: ${index}`}
												key={index as number}
												title={`Answer ${index}`}
											>
												{answer}
											</AccordionItem>
										);
									})}
								</Accordion>
							</ScrollShadow>
						</div>
					)}
				</div>
			))}
		</div>
	);
};
