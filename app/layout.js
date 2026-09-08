import "./globals.css";
import { Bricolage_Grotesque, Inter, Instrument_Serif } from "next/font/google";
import { RESTAURANT } from "../data/menu.js";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata = {
  title: `${RESTAURANT.name} — Menu`,
  description: `Scan-to-table menu for ${RESTAURANT.name}.`,
};

export const viewport = {
  themeColor: "#0C0B10",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
