import { useMemo, useState } from "react";
import animeJson from "./data/anime.json";
import { AnimeGrid } from "./components/AnimeGrid";
import { HeroSection } from "./components/HeroSection";
import { SearchBar } from "./components/SearchBar";
import { SiteHeader } from "./components/SiteHeader";
import type { Anime } from "./types";
import "./App.css";

const animeList: Anime[] = animeJson;
const genres = ["All", ...Array.from(new Set(animeList.flatMap((anime) => anime.genres))).sort()];

function App() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const filteredAnime = useMemo(() => {
    const query = search.trim().toLowerCase();
    return animeList.filter((anime) => {
      const matchesSearch = !query ||
        anime.title.toLowerCase().includes(query) ||
        anime.englishTitle.toLowerCase().includes(query) ||
        anime.genres.some((genre) => genre.toLowerCase().includes(query));
      const matchesGenre = selectedGenre === "All" || anime.genres.includes(selectedGenre);
      return matchesSearch && matchesGenre;
    });
  }, [search, selectedGenre]);

  const averageScore = (animeList.reduce((sum, anime) => sum + anime.score, 0) / animeList.length).toFixed(1);

  return (
    <div className="app-shell">
      <SiteHeader />
      <main>
        <HeroSection totalAnime={animeList.length} averageScore={averageScore} />
        <section className="explore-section" id="explore">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE COLLECTION / 001</p>
              <h2>Explore <span>anime.</span></h2>
              <p className="section-description">Stories worth getting lost in.</p>
            </div>
            <div className="collection-count"><strong>{filteredAnime.length.toString().padStart(2, "0")}</strong><span>RESULTS</span></div>
          </div>

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
          <AnimeGrid anime={filteredAnime} />
        </section>
      </main>
      <footer className="site-footer">
        <a className="brand brand--footer" href="#top"><span className="brand__mark">A<span>✦</span></span><span className="brand__name">ANIME<span>EXPLORER</span></span></a>
        <p>MADE FOR THE LOVE OF STORIES <span>✦</span> 2026</p>
        <span className="footer-version">INDEPENDENT PROJECT / V1.0</span>
      </footer>
    </div>
  );
}

export default App;
