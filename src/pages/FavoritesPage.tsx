import { Link } from "react-router-dom";
import { AnimeGrid } from "../components/AnimeGrid";
import { useFavorites } from "../context/useFavorites";

export function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <section className="explore-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR COLLECTION / 002</p>
          <h2>Your <span>favorites.</span></h2>
          <p className="section-description">
            The stories you want to keep close.
          </p>
        </div>
        <div className="collection-count">
          <strong>{favorites.length.toString().padStart(2, "0")}</strong>
          <span>SAVED</span>
        </div>
      </div>

      {favorites.length > 0 ? (
        <AnimeGrid anime={favorites} />
      ) : (
        <div className="empty-state">
          <span className="empty-state__symbol">♡</span>
          <h3>No favorites yet</h3>
          <p>Explore the collection and save anime you love.</p>
          <Link className="header-nav__link" to="/">
            Explore anime →
          </Link>
        </div>
      )}
    </section>
  );
}

