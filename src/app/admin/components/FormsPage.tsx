"use client";

import { CardsGrid } from "@/components";
import type { FormCardProps } from "@/interfaces";

export const FormsPage = ({ data }: { data: FormCardProps[] }) => {
	return (
		<>
			<h1 className="mt-6 text-center font-semibold text-xl sm:text-2xl md:text-3xl">
				{data[0].authorName} Forms
			</h1>
			<div className="mt-5 flex w-screen justify-center">
				<CardsGrid cardsData={data} />
			</div>
		</>
	);
};
