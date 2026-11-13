
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAnimeById } from "../services/jikan";
import type { Anime } from "../types";

export function AnimeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const animeId = Number(id);
  const isValidId = Number.isInteger(animeId) && animeId > 0;
  const [anime, setAnime] = useState<Anime | null>(null);
  const [isLoading, setIsLoading] = useState(isValidId);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isValidId) return;

    const controller = new AbortController();

    async function loadDetails() {
      setIsLoading(true);
      setError("");
      setAnime(null);

      try {
        const result = await getAnimeById(animeId, controller.signal);
        setAnime(result);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Unable to load this anime.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadDetails();
    return () => controller.abort();
  }, [animeId, isValidId]);

  if (!isValidId) {
    return (
      <section className="details-section">
        <div className="not-found">
          <p className="eyebrow">ERROR / 404</p>
          <h1>Anime not found.</h1>
          <p>The requested anime ID is not valid.</p>
          <Link className="details-back" to="/">← BACK TO EXPLORE</Link>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="details-section">
        <div className="api-state" role="status">
          <span className="api-state__spinner" />
          <p>Loading anime details...</p>
        </div>
      </section>
    );
  }

  if (error || !anime) {
    return (
      <section className="details-section">
        <div className="not-found">
          <p className="eyebrow">UNAVAILABLE</p>
          <h1>{error ? "Couldn’t load this anime." : "Anime not found."}</h1>
          <p>{error || "This title could not be found in the Tenrai collection."}</p>
          <Link className="details-back" to="/">← BACK TO EXPLORE</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="details-section">
      <Link className="details-back" to="/">← BACK TO EXPLORE</Link>
      <div className="details-layout">
        <div className="details-poster poster poster--image">
          {anime.imageUrl ? (
            <img className="poster__image" src={anime.imageUrl} alt={`${anime.title} poster`} />
          ) : (
            <div className="poster__placeholder">ANIME EXPLORER</div>
          )}
          <span className="poster__eyebrow">ANIME EXPLORER / {anime.id}</span>
          <div className="poster__bottom">
            <span className="poster__year">{anime.year ?? "—"}</span>
            <span className="poster__label">ANIME PROFILE</span>
          </div>
        </div>
        <div className="details-content">
          <p className="eyebrow">COLLECTION / TITLE {String(anime.id).padStart(3, "0")}</p>
          <h1>{anime.title}</h1>
          <p className="details-english-title">{anime.englishTitle}</p>
          <div className="details-score">
            <span>★</span> {anime.score ? anime.score.toFixed(1) : "N/A"} <small>MYANIMELIST SCORE</small>
          </div>
          <p className="details-synopsis">{anime.synopsis}</p>
          <div className="details-facts">
            <div><span>YEAR</span><strong>{anime.year ?? "Unknown"}</strong></div>
            <div><span>EPISODES</span><strong>{anime.episodes ?? "Unknown"}</strong></div>
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
