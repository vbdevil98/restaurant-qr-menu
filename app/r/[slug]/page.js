import { notFound } from "next/navigation";
import { getRestaurant, getAllSlugs, getSummaries } from "../../../lib/menu.js";
import Menu from "../../../components/Menu.jsx";

// Pre-build a page for each restaurant we know about.
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const restaurant = getRestaurant(slug);
  return {
    title: restaurant ? `${restaurant.name} — Menu` : "Menu",
    description: restaurant?.tagline || "Scan-to-table menu",
  };
}

export default async function RestaurantPage({ params }) {
  const { slug } = await params;
  const restaurant = getRestaurant(slug);
  if (!restaurant) notFound();

  return <Menu restaurant={restaurant} summaries={getSummaries()} />;
}
