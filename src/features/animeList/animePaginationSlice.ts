import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//updateByComponent: useGetAnimeSearch
//subscribeByComponent: CustomPagination, useGetAnimeSearch

interface AnimePaginationState {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

const initialState: AnimePaginationState = {
  last_visible_page: 1,
  has_next_page: false,
  current_page: 1,
  items: {
    count: 0,
    total: 0,
    per_page: 10,
  },
};

const animePaginationSlice = createSlice({
  name: "animePagination",
  initialState,
  reducers: {
    setAnimePagination: (
      state,
      action: PayloadAction<AnimePaginationState>
    ) => {
      state.last_visible_page = action.payload.last_visible_page;
      state.has_next_page = action.payload.has_next_page;
      state.current_page = action.payload.current_page;
      state.items = action.payload.items;
    },
    resetAnimePagination: (state) => {
      const per_page = state.items.per_page;
      return {
        ...initialState,
        items: {
          ...initialState.items,
          per_page,
        },
      };
    },
  },
});

export const { setAnimePagination, resetAnimePagination } =
  animePaginationSlice.actions;

export default animePaginationSlice.reducer;
