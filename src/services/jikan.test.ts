import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import { getAnimeById, getTopAnime } from "./jikan";
import type { JikanAnime } from "../types";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function makeAnime(overrides: Partial<JikanAnime> = {}): JikanAnime {
  return {
    mal_id: 5114,
    title: "Fullmetal Alchemist: Brotherhood",
    title_english: "Fullmetal Alchemist: Brotherhood",
    score: 9.1,
    year: 2009,
    episodes: 64,
    status: "Finished Airing",
    synopsis: "Two brothers search for the Philosopher's Stone.",
    images: {
      jpg: {
        image_url: "https://example.com/poster.jpg",
        large_image_url: "https://example.com/poster-large.jpg",
      },
      webp: {
        image_url: "https://example.com/poster.webp",
        large_image_url: "https://example.com/poster-large.webp",
      },
    },
    genres: [
      { mal_id: 1, name: "Action" },
      { mal_id: 2, name: "Adventure" },
    ],
    aired: { from: "2009-04-05T00:00:00+00:00" },
    ...overrides,
  };
}

function mockFetch(payload: unknown, status = 200) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: vi.fn().mockResolvedValue(payload),
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("Tenrai anime service", () => {
  it("loads the top anime list and maps API fields into the app's Anime shape", async () => {
    const anime = makeAnime();
    const fetchMock = mockFetch({ data: [anime] });

    const result = await getTopAnime();

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.tenrai.org/v1/top/anime?limit=25&sfw",
      { signal: undefined },
    );
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      id: 5114,
      title: "Fullmetal Alchemist: Brotherhood",
      englishTitle: "Fullmetal Alchemist: Brotherhood",
      score: 9.1,
      year: 2009,
      episodes: 64,
      status: "Finished Airing",
      genres: ["Action", "Adventure"],
      synopsis: "Two brothers search for the Philosopher's Stone.",
      imageUrl: "https://example.com/poster-large.webp",
    });
  });

  it("loads one anime by its MAL id", async () => {
    mockFetch({ data: makeAnime() });

    const result = await getAnimeById(5114);

    expect(result.id).toBe(5114);
    expect(result.title).toBe("Fullmetal Alchemist: Brotherhood");
    expect(result.year).toBe(2009);
  });

  it("uses safe defaults when optional API fields are missing", async () => {
    const anime = makeAnime({
      title_english: null,
      score: null,
      year: null,
      episodes: null,
      status: null,
      synopsis: null,
      images: {},
      genres: [],
      aired: { from: "2012-07-01T00:00:00+00:00" },
    });
    mockFetch({ data: [anime] });

    const [result] = await getTopAnime();

    expect(result.englishTitle).toBe(result.title);
    expect(result.score).toBe(0);
    expect(result.year).toBe(2012);
    expect(result.episodes).toBeNull();
    expect(result.status).toBe("Unknown");
    expect(result.synopsis).toBe("No synopsis is available for this title.");
    expect(result.imageUrl).toBe("");
    expect(result.genres).toEqual([]);
  });

  it("shows a specific message when the API rate limit is reached", async () => {
    mockFetch({}, 429);

    await expect(getTopAnime()).rejects.toThrow(
      "The anime service is receiving too many requests. Please wait a moment and try again.",
    );
  });

  it("shows the HTTP status when the API returns another server error", async () => {
    mockFetch({}, 503);

    await expect(getAnimeById(5114)).rejects.toThrow(
      "The anime service returned an error (503). Please try again.",
    );
  });

  it("passes an AbortSignal to fetch when one is provided", async () => {
    const fetchMock = mockFetch({ data: [] });
    const controller = new AbortController();

    await getTopAnime(controller.signal);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.tenrai.org/v1/top/anime?limit=25&sfw",
      { signal: controller.signal },
    );
  });
});
