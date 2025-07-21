"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { ScrollShadow } from "@nextui-org/react";
import { BarChart } from "@/components/BarChart";
import { DonutChart } from "@/components/DonuChart";
import type { FormeResults } from "@/interfaces";
import {
	formatDataForBarChart,
	formatDataForNumericBarChart,
	formatDataForPieChart,
} from "../utils";

export const FormResultsPage = ({ data }: { data: FormeResults[] }) => {
	return (
		<div className="flex flex-col w-[95%] mx-auto mb-10">
			{data.map((questionData) => (
				<div key={questionData.questionId} className="mt-4 mb-4">
					<h3 className="text-lg lg:text-2xl font-semibold mb-4 text-center">
						{questionData.question}
					</h3>

					{questionData.type === "multiple" && (
						<div className="w-full flex justify-center">
							<BarChart
								className="h-80 w-full max-w-[1280px]"
								data={formatDataForBarChart(questionData)}
								index="option"
								categories={["Count"]}
								valueFormatter={(value: number) => `${value}`}
							/>
						</div>
					)}
					{questionData.type === "single" && (
						<div className="flex flex-col w-full items-center">
							<div className="flex gap-2 mb-4">
								<div className="flex items-center gap-2">
									No <div className="bg-[#10b981] w-3 h-3 rounded-sm" />
								</div>
								<div className="flex items-center gap-2">
									Yes <div className="bg-[#3b82f6] w-3 h-3 rounded-sm" />
								</div>
							</div>
							<DonutChart
								data={formatDataForPieChart(questionData)}
								variant="pie"
								category="name"
								value="amount"
							/>
						</div>
					)}
					{questionData.type === "numeric" && (
						<div className="w-full flex justify-center">
							<BarChart
								className="h-80 w-full max-w-[1280px]"
								data={formatDataForNumericBarChart(questionData)}
								index="number"
								categories={["Count"]}
								valueFormatter={(value: number) => `${value}`}
							/>
						</div>
					)}
					{questionData.type === "long" && (
						<div className="w-full flex justify-center">
							<ScrollShadow className=" w-[95%] h-[400px] max-w-[1280px]">
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
						<div className="w-full flex justify-center">
							<ScrollShadow className=" w-[95%] h-[400px] max-w-[1280px]">
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
