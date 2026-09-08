function kind(t) {
  const s = t.toLowerCase();
  if (s.includes("protein")) return "protein";
  if (s.includes("spic")) return "spicy";
  if (s.includes("sweet")) return "sweet";
  if (s.includes("veg") || s.includes("gluten") || s.includes("fresh")) return "green";
  return "neutral";
}

export default function Tag({ label }) {
  return <span className={"tag tag--" + kind(label)}>{label}</span>;
}
