import type { FormCardProps } from "@/interfaces";
import { FormCard } from ".";

export interface CardsGridProps {
	cardsData: FormCardProps[];
}

export const CardsGrid = ({ cardsData }: CardsGridProps) => {
	return (
		<section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center w-full lg:w-[90%] max-w-[1300px]">
			{cardsData.map((card) => (
				<FormCard
					key={card.id}
					id={card.id}
					title={card.title}
					author={card.author}
					likes={card.likes}
				/>
			))}
		</section>
	);
};
