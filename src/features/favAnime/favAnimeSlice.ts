import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//updatedByComponent: AnimeCard, DetailsPage
//subscribedByComponent: AnimeCard, DetailsPage, FavAnimeMenu

export interface FavoriteAnime {
  id: number;
  title: string;
  image: string;
}

interface FavoriteAnimeState {
  favorites: FavoriteAnime[];
}

const initialState: FavoriteAnimeState = {
  favorites: [],
};

const favoriteAnimeSlice = createSlice({
  name: "favoriteAnime",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteAnime>) => {
      if (!state.favorites.find((a) => a.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter((a) => a.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteAnimeSlice.actions;
export default favoriteAnimeSlice.reducer;
