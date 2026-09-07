import { restaurants } from "../data/restaurants.js";
import summaries from "../data/summaries.json";

export function getRestaurant(slug) {
  return restaurants[slug] || null;
}

export function getAllSlugs() {
  return Object.keys(restaurants);
}

// Pre-generated summaries are keyed as "slug:dishId".
export function getSummaries() {
  return summaries;
}
