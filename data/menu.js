// ─────────────────────────────────────────────────────────────────────────
//  THIS IS THE ONLY FILE YOU NEED TO EDIT TO CHANGE THE MENU.
//  Replace the restaurant name, tagline, and dishes with the real ones.
//
//  Each dish's `image` is a path to a photo in /public/images/dishes/.
//  Drop a photo with the matching filename there and it appears automatically.
//  No photo yet? The card shows a colored tile with the dish emoji instead,
//  so it always looks finished. (See public/images/dishes/IMAGES.md for the
//  full "which file goes where" list.)
// ─────────────────────────────────────────────────────────────────────────

export const RESTAURANT = {
  name: "Bloom Kitchen",
  tagline: "neighborhood comfort food, turned all the way up",
};

export const CURRENCY = "$";

// The order of these is the order the category tabs appear in.
export const CATEGORIES = ["Starters", "Mains", "Sweets", "Sips"];

export const MENU = [
  {
    id: "truffle-parm-fries",
    name: "Truffle Parm Fries",
    category: "Starters",
    price: 9,
    emoji: "🍟",
    image: "/images/dishes/truffle-parm-fries.jpg",
    blurb: "Crispy hand-cut fries tossed in truffle oil and a snowfall of parmesan.",
    ingredients: ["hand-cut potato", "truffle oil", "parmesan", "chives"],
    tags: ["Vegetarian", "Shareable"],
  },
  {
    id: "korean-fried-chicken",
    name: "Korean Fried Chicken",
    category: "Starters",
    price: 13,
    emoji: "🍗",
    image: "/images/dishes/korean-fried-chicken.jpg",
    blurb: "Double-fried and lacquered in sticky-sweet gochujang with a slow-building heat.",
    ingredients: ["chicken", "gochujang glaze", "sesame", "scallion"],
    tags: ["High protein", "Spicy"],
  },
  {
    id: "burrata-toast",
    name: "Burrata Toast",
    category: "Starters",
    price: 12,
    emoji: "🫓",
    image: "/images/dishes/burrata-toast.jpg",
    blurb: "Torn-open burrata over charred sourdough with tomatoes and good olive oil.",
    ingredients: ["sourdough", "burrata", "heirloom tomato", "basil", "olive oil"],
    tags: ["Vegetarian", "Fresh"],
  },
  {
    id: "bang-bang-cauliflower",
    name: "Bang Bang Cauliflower",
    category: "Starters",
    price: 10,
    emoji: "🥦",
    image: "/images/dishes/bang-bang-cauliflower.jpg",
    blurb: "Crispy cauliflower in a creamy sweet-chili glaze with a squeeze of lime.",
    ingredients: ["cauliflower", "sweet chili", "sriracha aioli", "lime"],
    tags: ["Vegan", "Spicy"],
  },

  {
    id: "smash-burger",
    name: "Smash Burger",
    category: "Mains",
    price: 15,
    emoji: "🍔",
    image: "/images/dishes/smash-burger.jpg",
    blurb: "Two craggy-edged smash patties, molten cheese, house sauce, soft brioche.",
    ingredients: ["double beef patty", "american cheese", "pickles", "house sauce", "brioche"],
    tags: ["High protein"],
  },
  {
    id: "spicy-rigatoni-vodka",
    name: "Spicy Rigatoni Vodka",
    category: "Mains",
    price: 17,
    emoji: "🍝",
    image: "/images/dishes/spicy-rigatoni-vodka.jpg",
    blurb: "Silky vodka sauce with a Calabrian-chili kick clinging to every rigatoni.",
    ingredients: ["rigatoni", "san marzano", "vodka", "cream", "calabrian chili"],
    tags: ["Vegetarian", "Spicy"],
  },
  {
    id: "birria-tacos",
    name: "Birria Tacos",
    category: "Mains",
    price: 14,
    emoji: "🌮",
    image: "/images/dishes/birria-tacos.jpg",
    blurb: "Slow-braised beef tacos crisped on the griddle, with rich consommé to dip.",
    ingredients: ["braised beef", "consommé", "onion", "cilantro", "lime"],
    tags: ["High protein"],
  },
  {
    id: "crispy-salmon-bowl",
    name: "Crispy Salmon Bowl",
    category: "Mains",
    price: 16,
    emoji: "🍚",
    image: "/images/dishes/crispy-salmon-bowl.jpg",
    blurb: "Crispy-skin salmon over rice with avocado, cucumber, and spicy mayo.",
    ingredients: ["salmon", "rice", "avocado", "cucumber", "spicy mayo", "furikake"],
    tags: ["High protein", "Gluten-free"],
  },

  {
    id: "matcha-basque-cheesecake",
    name: "Matcha Basque Cheesecake",
    category: "Sweets",
    price: 10,
    emoji: "🍵",
    image: "/images/dishes/matcha-basque-cheesecake.jpg",
    blurb: "Burnt-top Basque cheesecake with a mellow, earthy matcha swirl.",
    ingredients: ["matcha", "cream cheese", "burnt top"],
    tags: ["Vegetarian", "Sweet"],
  },
  {
    id: "brown-butter-cookie",
    name: "Brown Butter Cookie",
    category: "Sweets",
    price: 5,
    emoji: "🍪",
    image: "/images/dishes/brown-butter-cookie.jpg",
    blurb: "Gooey-centered cookie — brown butter, dark chocolate, flaky salt.",
    ingredients: ["brown butter", "dark chocolate", "sea salt"],
    tags: ["Vegetarian", "Sweet"],
  },

  {
    id: "iced-spanish-latte",
    name: "Iced Spanish Latte",
    category: "Sips",
    price: 6,
    emoji: "☕",
    image: "/images/dishes/iced-spanish-latte.jpg",
    blurb: "Espresso and sweet condensed milk over ice — smooth and a little addictive.",
    ingredients: ["espresso", "condensed milk", "oat milk", "ice"],
    tags: ["Vegetarian"],
  },
  {
    id: "strawberry-matcha",
    name: "Strawberry Matcha",
    category: "Sips",
    price: 7,
    emoji: "🍓",
    image: "/images/dishes/strawberry-matcha.jpg",
    blurb: "Layered strawberry and matcha over oat milk — as good as it looks.",
    ingredients: ["matcha", "strawberry", "oat milk"],
    tags: ["Vegan", "Fresh"],
  },
  {
    id: "yuzu-spritz",
    name: "Yuzu Spritz",
    category: "Sips",
    price: 8,
    emoji: "🍋",
    image: "/images/dishes/yuzu-spritz.jpg",
    blurb: "Bright yuzu and elderflower spritz with mint — crisp and fizzy.",
    ingredients: ["yuzu", "soda", "mint", "elderflower"],
    tags: ["Vegan", "Fresh"],
  },
];
