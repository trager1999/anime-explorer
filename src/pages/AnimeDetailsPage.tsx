import { Link, useParams } from "react-router-dom";
import { animeList } from "../data/animeData";

export function AnimeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const animeId = Number(id);
  const anime = Number.isInteger(animeId) ? animeList.find((item) => item.id === animeId) : undefined;

  if (!anime) {
    return (
      <section className="details-section">
        <div className="not-found">
          <p className="eyebrow">ERROR / 404</p>
          <h1>Anime not found.</h1>
          <p>The requested title is not part of this collection.</p>
          <Link className="details-back" to="/">← BACK TO EXPLORE</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="details-section">
      <Link className="details-back" to="/">← BACK TO EXPLORE</Link>
      <div className="details-layout">
        <div className={`details-poster poster poster--${anime.accent}`}>
          <div className="poster__orbit poster__orbit--one" />
          <div className="poster__orbit poster__orbit--two" />
          <span className="poster__eyebrow">ANIME EXPLORER / 0{anime.id}</span>
          <span className="poster__symbol" aria-hidden="true">{anime.symbol}</span>
          <div className="poster__bottom">
            <span className="poster__year">{anime.year}</span>
            <span className="poster__label">FEATURED SERIES</span>
          </div>
        </div>
        <div className="details-content">
          <p className="eyebrow">COLLECTION / TITLE {String(anime.id).padStart(3, "0")}</p>
          <h1>{anime.title}</h1>
          <p className="details-english-title">{anime.englishTitle}</p>
          <div className="details-score"><span>★</span> {anime.score.toFixed(1)} <small>COLLECTION SCORE</small></div>
          <p className="details-synopsis">{anime.synopsis}</p>
          <div className="details-facts">
            <div><span>YEAR</span><strong>{anime.year}</strong></div>
            <div><span>EPISODES</span><strong>{anime.episodes}</strong></div>
            <div><span>STATUS</span><strong>{anime.status}</strong></div>
          </div>
          <h2>Genres</h2>
          <div className="tag-list details-tags">
            {anime.genres.map((genre) => <span className="tag" key={genre}>{genre}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
