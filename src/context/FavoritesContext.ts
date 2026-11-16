import { createContext } from "react";
import type { Anime } from "../types";

export interface FavoritesContextValue {
  favorites: Anime[];
  isFavorite: (id: number) => boolean;
  addFavorite: (anime: Anime) => void;
  removeFavorite: (id: number) => void;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null);
