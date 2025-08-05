"use client";

import { Spinner } from "@nextui-org/react";
import { useEffect, useReducer, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { CardsGrid, CloudTags, SearchInput } from "@/components";
import type { FormCardProps } from "@/interfaces";
import { getLatestForms } from "@/services/forms/getLatestForms";
import { useDebouncedSearch } from "../hooks/useDebounceSearch";
import { loadMoreCards } from "../services/loadMoreCards";
import { initializeState, reducer } from "../store/state";

const MainPage = ({ cardsData }: { cardsData: FormCardProps[] }) => {
	const [state, dispatch] = useReducer(reducer, cardsData, initializeState);
	const { ref, inView } = useInView({ threshold: 0.5 });
	const pageRef = useRef(1);
	const debouncedSearch = useDebouncedSearch(dispatch, pageRef, getLatestForms);

	const loadMore = async () => {
		await loadMoreCards(state, dispatch, pageRef, getLatestForms);
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
			<div className="w-full flex lg:justify-end lg:flex mt-2 lg:max-w-[1280px] lg:mx-auto">
				<SearchInput
					value={state.fullTextSearch}
					setValue={handleInputChange}
				/>
			</div>
			<CloudTags />
			<div className="mt-5 w-screen flex justify-center">
				<CardsGrid cardsData={state.cards} />
			</div>
			<div ref={ref} className="h-10" />
			<div className="w-full flex justify-center">
				{state.loading && <Spinner size="lg" />}
			</div>
		</>
	);
};
export default MainPage;
