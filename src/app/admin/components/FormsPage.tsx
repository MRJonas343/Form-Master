"use client";

import { CardsGrid } from "@/components";
import type { FormCardProps } from "@/interfaces";

export const FormsPage = ({ data }: { data: FormCardProps[] }) => {
	return (
		<>
			<h1 className="text-center mt-6 text-xl sm:text-2xl md:text-3xl font-semibold">
				{data[0].authorName} Forms
			</h1>
			<div className="mt-5 w-screen flex justify-center">
				<CardsGrid cardsData={data} />
			</div>
		</>
	);
};
