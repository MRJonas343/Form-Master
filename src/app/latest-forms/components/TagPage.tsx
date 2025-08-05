"use client";

import { Spinner } from "@nextui-org/react";
import { useEffect, useReducer, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { CardsGrid, CloudTags, SearchInput } from "@/components";
import type { FormCardProps } from "@/interfaces";
import { getFormsByTag } from "@/services/forms/getFormsByTag";
import { useDebouncedSearch } from "../hooks/useDebounceSearch";
import { loadMoreCards } from "../services/loadMoreCards";
import { initializeState, reducer } from "../store/state";

export const TagPage = ({
	cardsData,
	tag,
}: {
	cardsData: FormCardProps[];
	tag: string;
}) => {
	const [state, dispatch] = useReducer(reducer, cardsData, initializeState);
	const { ref, inView } = useInView({ threshold: 0.5 });
	const pageRef = useRef(1);
	const debouncedSearch = useDebouncedSearch(
		dispatch,
		pageRef,
		getFormsByTag,
		tag
	);

	const loadMore = async () => {
		await loadMoreCards(state, dispatch, pageRef, getFormsByTag, tag);
	};

	const handleInputChange = (value: string) => {
		dispatch({ type: "SET_FULL_TEXT_SEARCH", payload: value });
		debouncedSearch(value);
	};

	useEffect(() => {
		if (inView && state.hasMore && state.fullTextSearch === "") {
			loadMore();
		}
	}, [inView, state.hasMore, state.fullTextSearch]);

	return (
		<>
			<div className="mt-2 flex w-full lg:mx-auto lg:flex lg:max-w-[1280px] lg:justify-end">
				<SearchInput
					setValue={handleInputChange}
					value={state.fullTextSearch}
				/>
			</div>
			<CloudTags />
			<div className="mt-5 flex w-screen justify-center">
				<CardsGrid cardsData={state.cards} />
			</div>
			<div className="h-10" ref={ref} />
			<div className="flex w-full justify-center">
				{state.loading && <Spinner size="lg" />}
			</div>
		</>
	);
};
