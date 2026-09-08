import Menu from "../components/Menu.jsx";
import { RESTAURANT, MENU, CATEGORIES, CURRENCY } from "../data/menu.js";

export default function Page() {
  return (
    <Menu
      restaurant={RESTAURANT}
      menu={MENU}
      categories={CATEGORIES}
      currency={CURRENCY}
    />
  );
}
