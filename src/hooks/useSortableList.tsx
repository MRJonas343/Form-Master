import type { SortDescriptor } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { useState } from "react";

export type GenericItem = Record<string, unknown>;

interface UseSortableListOptions<T> {
	items: T[];
}

export const useSortableList = <T extends GenericItem>({
	items,
}: UseSortableListOptions<T>) => {
	const [localItems, setLocalItems] = useState(items);
	const [isLoading, setIsLoading] = useState(false);

	const list = useAsyncList<T>({
		async load() {
			setIsLoading(false);
			return {
				items: localItems, // Usar los items locales
			};
		},
		async sort({
			items,
			sortDescriptor,
		}: {
			items: T[];
			sortDescriptor: SortDescriptor;
		}) {
			const columnKey = sortDescriptor.column as keyof T;

			return {
				items: items.sort((a, b) => {
					const first = a[columnKey];
					const second = b[columnKey];

					const cmp =
						(Number.parseInt(first as unknown as string) || first) <
						(Number.parseInt(second as unknown as string) || second)
							? -1
							: 1;

					return sortDescriptor.direction === "descending" ? -cmp : cmp;
				}),
			};
		},
	});

	const setItems = (newItems: T[]) => {
		setLocalItems(newItems);
		list.reload();
	};

	return { list, setItems, isLoading };
};
