import { configureStore } from "@reduxjs/toolkit";
import favoriteAnimeReducer from "./features/favAnime/favAnimeSlice";
import animeSearchReducer from "./features/animeList/animeSearchSlice";
import animePaginationReducer from "./features/animeList/animePaginationSlice";

export const store = configureStore({
  reducer: {
    favoriteAnime: favoriteAnimeReducer,
    animeSearch: animeSearchReducer,
    animePagination: animePaginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
