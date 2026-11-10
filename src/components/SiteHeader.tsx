export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Anime Explorer home">
        <span className="brand__mark">A<span>✦</span></span>
        <span className="brand__name">ANIME<span>EXPLORER</span></span>
      </a>
      <nav className="header-nav" aria-label="Main navigation">
        <a className="header-nav__link header-nav__link--active" href="#explore">Explore</a>
        <span className="header-nav__link header-nav__link--muted">Discover</span>
        <span className="header-nav__link header-nav__link--muted">About</span>
      </nav>
      <div className="header-status"><span /> CURATED ANIME INDEX</div>
    </header>
  );
}
