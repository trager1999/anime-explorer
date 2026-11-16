export interface Anime {
  id: number;
  title: string;
  englishTitle: string;
  score: number;
  year: number | null;
  episodes: number | null;
  status: string;
  genres: string[];
  studios: string[];
  synopsis: string;
  imageUrl: string;
}

export interface JikanImageVariant {
  image_url: string;
  small_image_url?: string;
  large_image_url?: string;
}

export interface JikanAnime {
  mal_id: number;
  title: string;
  title_english: string | null;
  score: number | null;
  year: number | null;
  episodes: number | null;
  status: string | null;
  synopsis: string | null;
  images: {
    jpg?: JikanImageVariant;
    webp?: JikanImageVariant;
  };
  genres: Array<{
    mal_id: number;
    name: string;
  }>;
  studios?: Array<{
    mal_id: number;
    name: string;
    type?: string;
  }>;
  aired?: {
    from: string | null;
  };
}

export interface JikanAnimeListResponse {
  data: JikanAnime[];
}

export interface JikanAnimeDetailsResponse {
  data: JikanAnime;
}
