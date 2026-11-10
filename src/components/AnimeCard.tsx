import type { Anime } from "../types";

interface AnimeCardProps {
  anime: Anime;
}

export function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <article className="anime-card">
      <div className={`poster poster--${anime.accent}`}>
        <div className="poster__orbit poster__orbit--one" />
        <div className="poster__orbit poster__orbit--two" />
        <span className="poster__eyebrow">ANIME EXPLORER / 0{anime.id}</span>
        <span className="poster__symbol" aria-hidden="true">{anime.symbol}</span>
        <div className="poster__bottom">
          <span className="poster__year">{anime.year}</span>
          <span className="poster__label">FEATURED SERIES</span>
        </div>
      </div>
      <div className="anime-card__content">
        <div className="anime-card__heading">
          <div>
            <h3>{anime.title}</h3>
            <p className="anime-card__subtitle">{anime.englishTitle}</p>
          </div>
          <div className="score"><span>★</span> {anime.score.toFixed(1)}</div>
        </div>
        <p className="anime-card__synopsis">{anime.synopsis}</p>
        <div className="anime-card__meta">
          <span>{anime.year}</span>
          <span>{anime.episodes} EP</span>
          <span>{anime.status}</span>
        </div>
        <div className="tag-list">
          {anime.genres.slice(0, 3).map((genre) => (
            <span className="tag" key={genre}>{genre}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
