// A small label pill. Colour carries meaning: dietary/health = green,
// heat = coral, everything else stays neutral.
export default function Tag({ label }) {
  const l = label.toLowerCase();
  let tone = "neutral";
  if (/(protein|vegan|veg|gluten|light|healthy|fresh)/.test(l)) tone = "good";
  else if (/(spicy|hot|chilli|fire)/.test(l)) tone = "hot";
  else if (/(sweet|dessert)/.test(l)) tone = "sweet";

  return <span className={`tag tag--${tone}`}>{label}</span>;
}
