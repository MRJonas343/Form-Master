"use client";

import { useDisclosure } from "@nextui-org/react";
import { useRef } from "react";
import { ModalWithFillForms } from "@/app/dashboard/components/ModalWithFillForms";
import type { FormCardProps } from "@/interfaces";
import { FormCard } from ".";
export interface CardsGridProps {
	cardsData: FormCardProps[];
}

export const CardsGrid = ({ cardsData }: CardsGridProps) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const formIdRef = useRef(0);

	const openModal = (id: number) => {
		formIdRef.current = id;
		onOpen();
	};

	return (
		<>
			<div className="w-full flex flex-col items-center">
				<section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center w-full lg:w-[80%] max-w-[1300px]">
					{cardsData.map((card) => (
						<FormCard
							key={card.id}
							id={card.id}
							title={card.title}
							authorName={card.authorName}
							likes={card.likes}
							openModal={(id) => openModal(id)}
							imageUrl={card.imageUrl}
						/>
					))}
				</section>
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
