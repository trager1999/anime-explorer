import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="details-section">
      <div className="not-found">
        <p className="eyebrow">ERROR / 404</p>
        <h1>Page not found.</h1>
        <p>The page you are looking for does not exist.</p>
        <Link className="details-back" to="/">← BACK TO EXPLORE</Link>
      </div>
    </section>
  );
}
