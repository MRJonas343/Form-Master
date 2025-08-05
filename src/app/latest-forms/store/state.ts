import type { FormCardProps } from "@/interfaces";

interface State {
	cards: FormCardProps[];
	fullTextSearch: string;
	loading: boolean;
	hasMore: boolean;
}

export type Action =
	| { type: "SET_CARDS"; payload: FormCardProps[] }
	| { type: "SET_FULL_TEXT_SEARCH"; payload: string }
	| { type: "SET_LOADING"; payload: boolean }
	| { type: "SET_HAS_MORE"; payload: boolean };

export const initialState: State = {
	cards: [],
	fullTextSearch: "",
	loading: false,
	hasMore: true,
};

export const initializeState = (cardsData: FormCardProps[]): State => ({
	cards: cardsData,
	fullTextSearch: "",
	loading: false,
	hasMore: true,
});

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_CARDS":
			return { ...state, cards: action.payload };
		case "SET_FULL_TEXT_SEARCH":
			return { ...state, fullTextSearch: action.payload };
		case "SET_LOADING":
			return { ...state, loading: action.payload };
		case "SET_HAS_MORE":
			return { ...state, hasMore: action.payload };
		default:
			return state;
	}
};
