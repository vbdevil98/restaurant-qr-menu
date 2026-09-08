// Shows the dish photo. If the file doesn't exist yet (or fails to load), the
// image fades to transparent and the colored emoji tile behind it shows through,
// so the menu always looks finished.

export default function DishImage({ dish }) {
  return (
    <>
      <div className="media__fallback">{dish.emoji}</div>
      <img
        className="media__img"
        src={dish.image}
        alt={dish.name}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.opacity = 0;
        }}
      />
    </>
  );
}
