import { getFormsWithFullTextSearch } from "@/services/forms/getFormsWithFullTextSearch";
import { useDebouncedCallback } from "use-debounce";
import type { FormCardProps } from "@/interfaces";
import type { Action } from "../store/state";
import type { MutableRefObject } from "react";

type ResetDataFunction = (
	page: number,
	limit: number,
	tag?: string,
) => Promise<{ hasMore: boolean; forms: FormCardProps[] }>;

export const useDebouncedSearch = (
	dispatch: (value: Action) => void,
	pageRef: MutableRefObject<number>,
	resetDataFunction: ResetDataFunction,
	tag?: string,
) => {
	return useDebouncedCallback(async (value: string) => {
		const result = await getFormsWithFullTextSearch(value);

		if (result.length === 0) {
			pageRef.current = 1;

			const { forms } = tag
				? await resetDataFunction(1, 10, tag)
				: await resetDataFunction(1, 10);

			dispatch({ type: "SET_CARDS", payload: forms });
			dispatch({ type: "SET_HAS_MORE", payload: true });
			return;
		}

		dispatch({ type: "SET_HAS_MORE", payload: true });
		dispatch({ type: "SET_CARDS", payload: result });
	}, 500);
};
