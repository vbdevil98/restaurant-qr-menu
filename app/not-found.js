import Link from "next/link";

export default function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound__emoji">🍽️</div>
      <h1 className="notfound__title">Nothing on the menu here</h1>
      <p className="notfound__text">
        This link doesn&rsquo;t point to a menu. Check the web address, or head back.
      </p>
      <Link href="/" className="notfound__link">
        Go home
      </Link>
    </div>
  );
}
