import { create } from "zustand";

interface FavoritesState {
  favoriteIds: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  setFavorites: (ids: string[]) => void;
}

export const useFavorites = create<FavoritesState>((set) => ({
  favoriteIds: [],
  addFavorite: (id) =>
    set((state) => ({ favoriteIds: [...state.favoriteIds, id] })),
  removeFavorite: (id) =>
    set((state) => ({
      favoriteIds: state.favoriteIds.filter((favId) => favId !== id),
    })),
  setFavorites: (ids) => ({ favoriteIds: ids }),
}));
