import DishImage from "./DishImage.jsx";
import Tag from "./Tag.jsx";

export default function DishCard({ dish, currency, qty, stagger, index, onOpen, onAdd }) {
  return (
    <div
      className={"card" + (stagger ? " enter" : "")}
      role="button"
      tabIndex={0}
      style={stagger ? { animationDelay: `${index * 45}ms` } : undefined}
      aria-label={`${dish.name}, ${currency}${dish.price}`}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      <div className={"media media--" + dish.category.toLowerCase()}>
        <DishImage dish={dish} />
        {qty > 0 && <span className="qty">{qty}</span>}
        <button
          className="add"
          aria-label={`Add ${dish.name} to order`}
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
        >
          ＋
        </button>
      </div>
      <div className="card__body">
        <div className="card__row">
          <span className="card__name">{dish.name}</span>
          <span className="card__price">
            {currency}
            {dish.price}
          </span>
        </div>
        <p className="card__blurb">{dish.blurb}</p>
        <div className="card__tags">
          {dish.tags.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
