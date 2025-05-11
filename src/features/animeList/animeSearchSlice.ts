import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//updatedByComponent: SearchBar, CustomPagination
//subscribedByComponent: AnimeList

export interface AnimeSearchParams {
  q: string;
  sfw: boolean;
  page?: number;
  limit?: number;
}

const initialState: AnimeSearchParams = {
  q: "",
  sfw: true,
  page: 1,
  limit: 10,
};

const animeSearchSlice = createSlice({
  name: "animeSearch",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      if (action.payload === state.q) return;
      state.q = action.payload;
      state.page = 1; // Reset page to 1 when query changes
    },
    setSearchSfw(state, action: PayloadAction<boolean>) {
      if (action.payload === state.sfw) return;
      state.sfw = action.payload;
      state.page = 1; // Reset page to 1 when sfw changes
    },
    setSearchPage(state, action: PayloadAction<number>) {
      if (action.payload < 1 || action.payload === state.page) return;
      state.page = action.payload;
    },
    setSearchLimit(state, action: PayloadAction<number>) {
      if (action.payload === state.limit) return;
      state.limit = action.payload;
      state.page = 1; // Reset page to 1 when limit changes
    },
    setSearchAllParams(
      state,
      action: PayloadAction<Partial<AnimeSearchParams>>
    ) {
      return {
        ...state,
        ...Object.fromEntries(
          Object.entries(action.payload).filter(
            ([key, value]) => state[key as keyof AnimeSearchParams] !== value
          )
        ),
      };
    },
    resetSearchParams: () => initialState,
  },
});

export const {
  setSearchQuery,
  setSearchSfw,
  setSearchPage,
  setSearchLimit,
  setSearchAllParams,
  resetSearchParams,
} = animeSearchSlice.actions;

export default animeSearchSlice.reducer;
