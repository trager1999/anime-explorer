interface HeroSectionProps {
  totalAnime: number;
  averageScore: string;
}

export function HeroSection({ totalAnime, averageScore }: HeroSectionProps) {
  return (
    <section className="hero">
      <div className="hero__glow" />
      <div className="hero__content">
        <p className="eyebrow"><span /> YOUR NEXT STORY STARTS HERE</p>
        <h1>Find your next<br /><span>obsession.</span></h1>
        <p className="hero__description">
          A universe of stories, worlds, and unforgettable characters.
          Explore hand-picked anime and find the one that stays with you.
        </p>
        <a className="hero__cta" href="#explore">Explore the collection <span>↘</span></a>
      </div>
      <div className="hero__art" aria-hidden="true">
        <div className="hero__ring hero__ring--outer" />
        <div className="hero__ring hero__ring--inner" />
        <div className="hero__moon">✦</div>
        <div className="hero__vertical">STORIES BEYOND IMAGINATION</div>
        <div className="hero__coordinates">35° 41' 22.2&quot; N<br />139° 41' 30.1&quot; E</div>
      </div>
      <div className="hero__stats">
        <div><strong>{totalAnime.toString().padStart(2, "0")}</strong><span>CURATED TITLES</span></div>
        <div><strong>{averageScore}</strong><span>AVG. COMMUNITY SCORE</span></div>
        <div><strong>∞</strong><span>WORLDS TO EXPLORE</span></div>
      </div>
      <span className="hero__index">VOL. 01 — THE COLLECTION</span>
    </section>
  );
}
