import { Link } from "react-router-dom";
import type { Anime } from "../types";

interface AnimeCardProps {
  anime: Anime;
}

export function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Link className="anime-card-link" to={`/anime/${anime.id}`} aria-label={`View details for ${anime.title}`}>
      <article className="anime-card">
        <div className="poster poster--image">
          {anime.imageUrl ? (
            <img className="poster__image" src={anime.imageUrl} alt={`${anime.title} poster`} loading="lazy" />
          ) : (
            <div className="poster__placeholder">ANIME EXPLORER</div>
          )}
          <span className="poster__eyebrow">ANIME EXPLORER / {anime.id}</span>
          <div className="poster__bottom">
            <span className="poster__year">{anime.year ?? "—"}</span>
            <span className="poster__label">FEATURED SERIES</span>
          </div>
        </div>
        <div className="anime-card__content">
          <div className="anime-card__heading">
            <div>
              <h3>{anime.title}</h3>
              <p className="anime-card__subtitle">{anime.englishTitle}</p>
            </div>
            <div className="score"><span>★</span> {anime.score ? anime.score.toFixed(1) : "N/A"}</div>
          </div>
          <p className="anime-card__synopsis">{anime.synopsis}</p>
          <div className="anime-card__meta">
            <span>{anime.year ?? "Year unknown"}</span>
            <span>{anime.episodes ?? "?"} EP</span>
            <span>{anime.status}</span>
          </div>
          <div className="tag-list">
            {anime.genres.slice(0, 3).map((genre) => (
              <span className="tag" key={genre}>{genre}</span>
            ))}
          </div>
          <span className="anime-card__more">VIEW DETAILS →</span>
        </div>
      </article>
    </Link>
  );
}
