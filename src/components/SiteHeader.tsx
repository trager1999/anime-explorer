import { Link, NavLink } from "react-router-dom";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Anime Explorer home">
        <span className="brand__mark">A<span>ג¦</span></span>
        <span className="brand__name">ANIME<span>EXPLORER</span></span>
      </Link>
      <nav className="header-nav" aria-label="Main navigation">
        <NavLink
          className={({ isActive }) => `header-nav__link${isActive ? " header-nav__link--active" : ""}`}
          to="/"
          end
        >
          Explore
        </NavLink>
        <span className="header-nav__link header-nav__link--muted">Discover</span>
        <a className="header-nav__link header-nav__link--muted" href="#top">About</a>
      </nav>
      <div className="header-status"><span /> CURATED ANIME INDEX</div>
    </header>
  );
}
