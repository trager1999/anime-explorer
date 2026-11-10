import type { Anime } from "../types";
import { AnimeCard } from "./AnimeCard";

interface AnimeGridProps {
  anime: Anime[];
}

export function AnimeGrid({ anime }: AnimeGridProps) {
  if (anime.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state__symbol">⌕</span>
        <h3>No anime found</h3>
        <p>Try another title or choose a different genre.</p>
      </div>
    );
  }

  return (
    <div className="anime-grid">
      {anime.map((item) => <AnimeCard key={item.id} anime={item} />)}
    </div>
  );
}
