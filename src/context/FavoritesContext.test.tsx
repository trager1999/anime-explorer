import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { ReactNode } from "react";
import { FavoritesProvider } from "./FavoritesProvider";
import { useFavorites } from "./useFavorites";
import type { Anime } from "../types";

const sampleAnime: Anime = {
  id: 5114,
  title: "Fullmetal Alchemist: Brotherhood",
  englishTitle: "Fullmetal Alchemist: Brotherhood",
  score: 9.1,
  year: 2009,
  episodes: 64,
  status: "Finished Airing",
  genres: ["Action", "Adventure"],
  studios: ["Bones"],
  synopsis: "A sample anime.",
  imageUrl: "",
};

function wrapper({ children }: { children: ReactNode }) {
  return <FavoritesProvider>{children}</FavoritesProvider>;
}

afterEach(() => {
  localStorage.clear();
});

describe("FavoritesContext", () => {
  it("starts with an empty favorites list", () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    expect(result.current.favorites).toEqual([]);
  });

  it("loads saved favorites from localStorage", () => {
    localStorage.setItem("anime-explorer-favorites", JSON.stringify([sampleAnime]));

    const { result } = renderHook(() => useFavorites(), { wrapper });

    expect(result.current.favorites).toEqual([sampleAnime]);
    expect(result.current.isFavorite(5114)).toBe(true);
  });

  it("adds a favorite and persists it", async () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => result.current.addFavorite(sampleAnime));

    expect(result.current.isFavorite(5114)).toBe(true);

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem("anime-explorer-favorites") || "[]"))
        .toEqual([sampleAnime]);
    });
  });

  it("does not add the same anime twice", () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(sampleAnime);
      result.current.addFavorite(sampleAnime);
    });

    expect(result.current.favorites).toHaveLength(1);
  });

  it("removes a favorite and persists the change", async () => {
    localStorage.setItem("anime-explorer-favorites", JSON.stringify([sampleAnime]));

    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => result.current.removeFavorite(5114));

    expect(result.current.isFavorite(5114)).toBe(false);

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem("anime-explorer-favorites") || "[]"))
        .toEqual([]);
    });
  });
});

