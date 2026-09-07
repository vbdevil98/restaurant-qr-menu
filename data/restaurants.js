// ============================================================================
//  YOUR MENU LIVES HERE
// ----------------------------------------------------------------------------
//  Each key (e.g. "bloom") is a restaurant "slug". It becomes the web address:
//      https://your-site.vercel.app/r/bloom
//
//  To add a second restaurant, copy the whole "bloom: { ... }" block, paste it
//  below, and change the slug + details. One deployment can serve many venues.
//
//  Photos: drop image files in  public/images/dishes/  and point "image" at
//  them, e.g. image: "/images/dishes/butter-chicken.jpg". If a photo is missing
//  the app shows a colored tile with the "emoji" instead, so nothing looks
//  broken while you're still gathering photos.
// ============================================================================

export const restaurants = {
  bloom: {
    slug: "bloom",
    name: "Bloom Kitchen",
    tagline: "Seasonal plates, made to share.",
    // Brand color used across this venue's menu (buttons, highlights).
    accent: "#FF5A36",
    currency: "$",
    // Order the tabs appear in. Every dish's "category" must match one of these.
    categories: ["Starters", "Mains", "Sweets", "Sips"],

    dishes: [
      {
        id: "crispy-corn",
        name: "Crispy Chilli Corn",
        category: "Starters",
        price: 8,
        emoji: "🌽",
        image: "/images/dishes/crispy-corn.jpg",
        blurb: "Golden sweetcorn in a sticky sweet-chilli glaze with charred spring onion.",
        ingredients: ["sweetcorn", "chilli", "garlic", "spring onion", "soy"],
        tags: ["Veg", "Spicy", "Shareable"],
      },
      {
        id: "chicken-65",
        name: "Chicken 65",
        category: "Starters",
        price: 10,
        emoji: "🍗",
        image: "/images/dishes/chicken-65.jpg",
        blurb: "Crunchy fried chicken bites fired up with curry leaf and red chilli.",
        ingredients: ["chicken", "curry leaf", "ginger", "chilli", "yogurt"],
        tags: ["High protein", "Spicy"],
      },
      {
        id: "paneer-skewers",
        name: "Paneer Tikka Skewers",
        category: "Starters",
        price: 11,
        emoji: "🧀",
        image: "/images/dishes/paneer-skewers.jpg",
        blurb: "Chargrilled paneer marinated in smoky yogurt and warm spices.",
        ingredients: ["paneer", "yogurt", "capsicum", "onion", "garam masala"],
        tags: ["Veg", "High protein"],
      },
      {
        id: "butter-chicken",
        name: "Butter Chicken",
        category: "Mains",
        price: 16,
        emoji: "🍛",
        image: "/images/dishes/butter-chicken.jpg",
        blurb: "Tandoori chicken simmered in a silky tomato-butter gravy.",
        ingredients: ["chicken", "tomato", "butter", "cream", "fenugreek"],
        tags: ["High protein"],
      },
      {
        id: "tofu-bao",
        name: "Smoky Tofu Bao",
        category: "Mains",
        price: 13,
        emoji: "🥟",
        image: "/images/dishes/tofu-bao.jpg",
        blurb: "Sticky glazed tofu in soft steamed bao with quick-pickled slaw.",
        ingredients: ["tofu", "bao", "hoisin", "cabbage", "sesame"],
        tags: ["Vegan", "High protein"],
      },
      {
        id: "truffle-pasta",
        name: "Truffle Mushroom Pasta",
        category: "Mains",
        price: 15,
        emoji: "🍝",
        image: "/images/dishes/truffle-pasta.jpg",
        blurb: "Wild mushrooms and truffle folded through silky ribbons of pasta.",
        ingredients: ["pasta", "mushroom", "truffle", "parmesan", "cream"],
        tags: ["Veg"],
      },
      {
        id: "smash-burger",
        name: "Double Smash Burger",
        category: "Mains",
        price: 14,
        emoji: "🍔",
        image: "/images/dishes/smash-burger.jpg",
        blurb: "Two seared beef patties, melted cheese, house sauce, toasted bun.",
        ingredients: ["beef", "cheddar", "brioche", "pickle", "house sauce"],
        tags: ["High protein"],
      },
      {
        id: "choc-lava",
        name: "Molten Choc Lava",
        category: "Sweets",
        price: 9,
        emoji: "🍫",
        image: "/images/dishes/choc-lava.jpg",
        blurb: "Warm chocolate cake with a molten center and cold vanilla cream.",
        ingredients: ["chocolate", "butter", "egg", "vanilla", "cream"],
        tags: ["Veg", "Sweet"],
      },
      {
        id: "mango-sticky-rice",
        name: "Mango Sticky Rice",
        category: "Sweets",
        price: 8,
        emoji: "🥭",
        image: "/images/dishes/mango-sticky-rice.jpg",
        blurb: "Ripe mango over coconut sticky rice with a toasted sesame crunch.",
        ingredients: ["mango", "sticky rice", "coconut milk", "sesame"],
        tags: ["Vegan", "Gluten-free"],
      },
      {
        id: "passionfruit-cooler",
        name: "Passionfruit Cooler",
        category: "Sips",
        price: 6,
        emoji: "🧉",
        image: "/images/dishes/passionfruit-cooler.jpg",
        blurb: "Passionfruit, lime and soda poured over crushed ice.",
        ingredients: ["passionfruit", "lime", "soda", "mint"],
        tags: ["Vegan", "Refreshing"],
      },
      {
        id: "spanish-latte",
        name: "Iced Spanish Latte",
        category: "Sips",
        price: 5,
        emoji: "☕",
        image: "/images/dishes/spanish-latte.jpg",
        blurb: "Espresso and sweet condensed milk over cold milk and ice.",
        ingredients: ["espresso", "condensed milk", "milk", "ice"],
        tags: ["Veg"],
      },
    ],
  },
};
