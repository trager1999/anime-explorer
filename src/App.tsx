
import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AnimeGrid } from "./components/AnimeGrid";
import { HeroSection } from "./components/HeroSection";
import { SearchBar } from "./components/SearchBar";
import { SiteHeader } from "./components/SiteHeader";
import { AnimeDetailsPage } from "./pages/AnimeDetailsPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { StatisticsPage } from "./pages/StatisticsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { getTopAnime } from "./services/jikan";
import type { Anime } from "./types";
import "./App.css";

function ExplorePage() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadAnime(signal?: AbortSignal) {
    setIsLoading(true);
    setError("");

    try {
      const anime = await getTopAnime(signal);
      setAnimeList(anime);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      if (!signal?.aborted) setIsLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    const fetchAnime = async () => {
      try {
        const anime = await getTopAnime(controller.signal);
        setAnimeList(anime);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    void fetchAnime();
    return () => controller.abort();
  }, []);

  const genres = useMemo(
    () => ["All", ...Array.from(new Set(animeList.flatMap((anime) => anime.genres))).sort()],
    [animeList],
  );

  const filteredAnime = useMemo(() => {
    const query = search.trim().toLowerCase();

    return animeList.filter((anime) => {
      const matchesSearch =
        !query ||
        anime.title.toLowerCase().includes(query) ||
        anime.englishTitle.toLowerCase().includes(query) ||
        anime.genres.some((genre) => genre.toLowerCase().includes(query));

      const matchesGenre =
        selectedGenre === "All" || anime.genres.includes(selectedGenre);

      return matchesSearch && matchesGenre;
    });
  }, [animeList, search, selectedGenre]);

  const scoredAnime = animeList.filter((anime) => anime.score > 0);
  const averageScore = scoredAnime.length
    ? (scoredAnime.reduce((sum, anime) => sum + anime.score, 0) / scoredAnime.length).toFixed(1)
    : "—";

  return (
    <>
      <HeroSection totalAnime={animeList.length} averageScore={averageScore} />
      <section className="explore-section" id="explore">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE COLLECTION / 001</p>
            <h2>Explore <span>anime.</span></h2>
            <p className="section-description">Stories worth getting lost in.</p>
          </div>
          <div className="collection-count">
            <strong>{filteredAnime.length.toString().padStart(2, "0")}</strong>
            <span>RESULTS</span>
          </div>
        </div>

        {isLoading && (
          <div className="api-state" role="status">
            <span className="api-state__spinner" />
            <p>Loading the collection from Tenrai...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="api-state api-state--error" role="alert">
            <p className="eyebrow">CONNECTION ISSUE</p>
            <h3>We couldn’t load the collection.</h3>
            <p>{error}</p>
            <button className="api-retry" type="button" onClick={() => void loadAnime()}>
              Try again
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <>
            <div className="toolbar">
              <SearchBar value={search} onChange={setSearch} />
              <span className="toolbar__label">FILTER BY GENRE</span>
            </div>
            <div className="genre-filters" aria-label="Filter by genre">
              {genres.map((genre) => (
                <button
                  className={`genre-chip${selectedGenre === genre ? " genre-chip--active" : ""}`}
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  type="button"
                  aria-pressed={selectedGenre === genre}
                >
                  {genre}
                </button>
              ))}
            </div>
            {filteredAnime.length > 0 ? (
              <AnimeGrid anime={filteredAnime} />
            ) : (
              <p className="api-empty">No anime match your search. Try another title or genre.</p>
            )}
          </>
        )}
      </section>
    </>
  );
}

function App() {
  return (
    <div className="app-shell" id="top">
      <SiteHeader />
      <main>
        <Routes>
          <Route path="/" element={<ExplorePage />} />
          <Route path="/anime/:id" element={<AnimeDetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/explore" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <a className="brand brand--footer" href="/">
          <span className="brand__mark">A<span>✦</span></span>
          <span className="brand__name">ANIME<span>EXPLORER</span></span>
        </a>
        <p>MADE FOR THE LOVE OF STORIES <span>✦</span> 2026</p>
        <span className="footer-version">INDEPENDENT PROJECT / V1.0</span>
      </footer>
    </div>
  );
}

export default App;
