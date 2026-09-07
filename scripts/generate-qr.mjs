// Generates a high-resolution QR code image that opens your menu.
//
//     npm run qr -- https://your-site.vercel.app/r/bloom
//
// Prints menu-qr.png in the project folder. Put it on table tents, stickers,
// or the check presenter. Re-run per restaurant/URL as you add venues.

import QRCode from "qrcode";

async function main() {
  const url = process.argv[2];
  if (!url) {
    console.error("Usage: npm run qr -- https://your-site.vercel.app/r/bloom");
    process.exit(1);
  }

  const file = "menu-qr.png";
  await QRCode.toFile(file, url, {
    width: 1200,
    margin: 2,
    errorCorrectionLevel: "M",
    color: { dark: "#17110D", light: "#FFFFFF" },
  });

  console.log(`Saved ${file}\n→ ${url}`);
}

main();
