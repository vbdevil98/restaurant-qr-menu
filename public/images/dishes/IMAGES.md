# Dish photos — drop them here

Put each photo in **this folder** (`public/images/dishes/`) using the **exact
filename** in the table below. The moment a file exists with the right name, it
shows up on the menu. No photo yet? The dish shows a colored tile with its emoji
instead, so nothing looks broken.

## Photo specs (read once)

- **Shape:** square-ish or landscape. They're shown cropped to a wide card
  (16:10) and a 3:2 detail image, so keep the food centered.
- **Size:** around **1200 px** on the long edge is plenty.
- **Format:** `.jpg` (recommended) or `.webp`. Keep each file under ~**300 KB**
  so the menu loads fast (any free image compressor works).
- **Naming:** all lowercase, words separated by hyphens, exactly as below.

> Using `.webp` instead of `.jpg`? Save the file as `.webp` **and** change that
> dish's `image` extension in `data/menu.js` to match.

## The list — one file per dish

| Dish | Save the photo as | Shoot / pick a photo of… |
|------|-------------------|--------------------------|
| Truffle Parm Fries | `truffle-parm-fries.jpg` | a pile of fries dusted with parmesan + herbs |
| Korean Fried Chicken | `korean-fried-chicken.jpg` | glossy red-glazed fried chicken, sesame on top |
| Burrata Toast | `burrata-toast.jpg` | toast topped with creamy burrata and tomato |
| Bang Bang Cauliflower | `bang-bang-cauliflower.jpg` | crispy cauliflower coated in orange chili sauce |
| Smash Burger | `smash-burger.jpg` | a cheeseburger with melty cheese, cut or whole |
| Spicy Rigatoni Vodka | `spicy-rigatoni-vodka.jpg` | rigatoni in a creamy pink/orange sauce |
| Birria Tacos | `birria-tacos.jpg` | crispy red-stained tacos with a cup of consommé |
| Crispy Salmon Bowl | `crispy-salmon-bowl.jpg` | salmon over rice with avocado and cucumber |
| Matcha Basque Cheesecake | `matcha-basque-cheesecake.jpg` | a slice of green, burnt-top cheesecake |
| Brown Butter Cookie | `brown-butter-cookie.jpg` | a chocolate-chip cookie, gooey center |
| Iced Spanish Latte | `iced-spanish-latte.jpg` | iced coffee in a glass with milk swirl |
| Strawberry Matcha | `strawberry-matcha.jpg` | layered pink + green drink over ice |
| Yuzu Spritz | `yuzu-spritz.jpg` | a fizzy citrus drink with mint, over ice |

When you change the menu in `data/menu.js`, add or rename photos to match each
dish's `image` path. That's the whole system.
