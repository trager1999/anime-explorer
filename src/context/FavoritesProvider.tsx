import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Anime } from "../types";
import { FavoritesContext } from "./FavoritesContext";

const FAVORITES_KEY = "anime-explorer-favorites";

function readFavorites(): Anime[] {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);
    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);
    return Array.isArray(parsed)
      ? parsed.filter(
          (item): item is Anime =>
            item !== null &&
            typeof item === "object" &&
            typeof item.id === "number" &&
            typeof item.title === "string",
        )
      : [];
  } catch {
    return [];
  }
}

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Anime[]>(readFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch {
      // Keep the in-memory favorites available if storage is unavailable.
    }
  }, [favorites]);

  function addFavorite(anime: Anime) {
    setFavorites((current) =>
      current.some((item) => item.id === anime.id)
        ? current
        : [...current, anime],
    );
  }

  function removeFavorite(id: number) {
    setFavorites((current) => current.filter((item) => item.id !== id));
  }

  function isFavorite(id: number) {
    return favorites.some((item) => item.id === id);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
