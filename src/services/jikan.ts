import type {
  Anime,
  JikanAnime,
  JikanAnimeDetailsResponse,
  JikanAnimeListResponse,
} from "../types";

const JIKAN_BASE_URL = "https://api.tenrai.org/v1";

function mapJikanAnime(item: JikanAnime): Anime {
  const imageUrl =
    item.images.webp?.large_image_url ??
    item.images.jpg?.large_image_url ??
    item.images.webp?.image_url ??
    item.images.jpg?.image_url ??
    "";

  const yearFromDate = item.aired?.from
    ? new Date(item.aired.from).getFullYear()
    : null;

  return {
    id: item.mal_id,
    title: item.title,
    englishTitle: item.title_english ?? item.title,
    score: item.score ?? 0,
    year: item.year ?? yearFromDate,
    episodes: item.episodes,
    status: item.status ?? "Unknown",
    genres: item.genres.map((genre) => genre.name),
    studios: item.studios?.map((studio) => studio.name) ?? [],
    synopsis: item.synopsis ?? "No synopsis is available for this title.",
    imageUrl,
  };
}

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("The anime service is receiving too many requests. Please wait a moment and try again.");
    }
    throw new Error(`The anime service returned an error (${response.status}). Please try again.`);
  }

  return (await response.json()) as T;
}

export async function getTopAnime(signal?: AbortSignal): Promise<Anime[]> {
  const response = await fetchJson<JikanAnimeListResponse>(
    `${JIKAN_BASE_URL}/top/anime?limit=25&sfw`,
    signal,
  );

  return response.data.map(mapJikanAnime);
}

export async function getAnimeById(
  id: number,
  signal?: AbortSignal,
): Promise<Anime> {
  const response = await fetchJson<JikanAnimeDetailsResponse>(
    `${JIKAN_BASE_URL}/anime/${id}`,
    signal,
  );

  if (!response.data || response.data.mal_id !== id) {
    throw new Error("Anime not found. The returned ID does not match the requested ID.");
  }

  return mapJikanAnime(response.data);
}