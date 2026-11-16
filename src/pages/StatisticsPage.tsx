import { useEffect, useMemo, useState } from "react";
import { getTopAnime } from "../services/jikan";
import type { Anime } from "../types";

export function StatisticsPage() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadStatistics() {
      try {
        const anime = await getTopAnime(controller.signal);
        setAnimeList(anime);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Could not load statistics.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadStatistics();
    return () => controller.abort();
  }, []);

  const statistics = useMemo(() => {
    const ratedAnime = animeList.filter(
      (anime) => Number.isFinite(anime.score) && anime.score > 0,
    );

    const averageScore = ratedAnime.length
      ? ratedAnime.reduce((sum, anime) => sum + anime.score, 0) / ratedAnime.length
      : null;

    const genreCounts = new Map<string, number>();
    const statusCounts = new Map<string, number>();

    animeList.forEach((anime) => {
      (anime.genres ?? []).forEach((genre) => {
        genreCounts.set(genre, (genreCounts.get(genre) ?? 0) + 1);
      });

      const status = anime.status?.trim() || "Unknown";
      statusCounts.set(status, (statusCounts.get(status) ?? 0) + 1);
    });

    const genres = Array.from(genreCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const statuses = Array.from(statusCounts.entries())
      .sort((a, b) => b[1] - a[1]);

    return { averageScore, genres, statuses };
  }, [animeList]);

  const maxGenreCount = Math.max(1, ...statistics.genres.map((item) => item[1]));
  const maxStatusCount = Math.max(1, ...statistics.statuses.map((item) => item[1]));

  return (
    <section className="explore-section statistics-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE COLLECTION / 003</p>
          <h2>Anime <span>statistics.</span></h2>
          <p className="section-description">
            A closer look at the stories in our collection.
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="api-state" role="status">
          <span className="api-state__spinner" />
          <p>Calculating collection statistics...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="api-state api-state--error" role="alert">
          <p className="eyebrow">CONNECTION ISSUE</p>
          <h3>Statistics are unavailable.</h3>
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <div className="stats-grid">
            <article className="stats-card">
              <span className="stats-card__label">AVAILABLE ANIME</span>
              <strong>{animeList.length}</strong>
              <span className="stats-card__detail">Titles in this collection</span>
            </article>

            <article className="stats-card">
              <span className="stats-card__label">AVERAGE RATING</span>
              <strong>
                {statistics.averageScore !== null
                  ? statistics.averageScore.toFixed(1)
                  : "—"}
                <small>/ 10</small>
              </strong>
              <span className="stats-card__detail">Based on available ratings</span>
            </article>

            <article className="stats-card">
              <span className="stats-card__label">GENRES FOUND</span>
              <strong>
                {new Set(animeList.flatMap((anime) => anime.genres ?? [])).size}
              </strong>
              <span className="stats-card__detail">Different genres represented</span>
            </article>
          </div>

          {animeList.length === 0 ? (
            <div className="empty-state stats-empty">
              <h3>No statistics available</h3>
              <p>There is no anime data to analyze yet.</p>
            </div>
          ) : (
            <div className="stats-panels">
              <article className="stats-panel">
                <div className="stats-panel__heading">
                  <div>
                    <p className="eyebrow">GENRE BREAKDOWN</p>
                    <h3>Most popular genres</h3>
                  </div>
                  <span>TOP 5</span>
                </div>

                {statistics.genres.length > 0 ? (
                  <div className="stats-bars">
                    {statistics.genres.map(([genre, count]) => (
                      <div className="stats-bar" key={genre}>
                        <div className="stats-bar__info">
                          <span>{genre}</span>
                          <strong>{count}</strong>
                        </div>
                        <div
                          className="stats-bar__track"
                          role="img"
                          aria-label={`${genre}: ${count} anime`}
                        >
                          <span
                            className="stats-bar__fill"
                            style={{ width: `${(count / maxGenreCount) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="stats-empty">Genre information is unavailable.</p>
                )}
              </article>

              <article className="stats-panel">
                <div className="stats-panel__heading">
                  <div>
                    <p className="eyebrow">STATUS BREAKDOWN</p>
                    <h3>Anime distribution</h3>
                  </div>
                </div>

                {statistics.statuses.length > 0 ? (
                  <div className="stats-bars">
                    {statistics.statuses.map(([status, count]) => (
                      <div className="stats-bar" key={status}>
                        <div className="stats-bar__info">
                          <span>{status}</span>
                          <strong>
                            {count} ({Math.round((count / animeList.length) * 100)}%)
                          </strong>
                        </div>
                        <div
                          className="stats-bar__track"
                          role="img"
                          aria-label={`${status}: ${count} anime`}
                        >
                          <span
                            className="stats-bar__fill"
                            style={{ width: `${(count / maxStatusCount) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="stats-empty">Status information is unavailable.</p>
                )}
              </article>
            </div>
          )}
        </>
      )}
    </section>
  );
}
