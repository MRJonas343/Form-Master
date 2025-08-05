import type { MutableRefObject } from "react";
import type { FormCardProps } from "@/interfaces";
import type { Action, initialState } from "../store/state";

type FetchDataFunction = (
	page: number,
	limit: number,
	tag?: string,
) => Promise<{ hasMore: boolean; forms: FormCardProps[] }>;

export const loadMoreCards = async (
	state: typeof initialState,
	dispatch: (value: Action) => void,
	pageRef: MutableRefObject<number>,
	fetchData: FetchDataFunction,
	tag?: string,
) => {
	if (state.loading || !state.hasMore) return;

	dispatch({ type: "SET_LOADING", payload: true });
	pageRef.current += 1;

	if (tag) {
		const { hasMore: newHasMore, forms: newForms } = await fetchData(
			pageRef.current,
			10,
			tag,
		);
		dispatch({ type: "SET_HAS_MORE", payload: newHasMore });
		dispatch({ type: "SET_CARDS", payload: [...state.cards, ...newForms] });
	}

	if (!tag) {
		const { hasMore: newHasMore, forms: newForms } = await fetchData(
			pageRef.current,
			10,
		);
		dispatch({ type: "SET_CARDS", payload: [...state.cards, ...newForms] });
		dispatch({ type: "SET_HAS_MORE", payload: newHasMore });
	}

	dispatch({ type: "SET_LOADING", payload: false });
};
