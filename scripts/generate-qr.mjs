// Generates a high-resolution QR code that opens your live menu.
//
//     npm run qr -- https://your-site.vercel.app
//
// Saves menu-qr.png in the project folder. Print it on table tents, stickers,
// or the check presenter.

import QRCode from "qrcode";

async function main() {
  const url = process.argv[2];
  if (!url) {
    console.error("Usage: npm run qr -- https://your-site.vercel.app");
    process.exit(1);
  }

  const file = "menu-qr.png";
  await QRCode.toFile(file, url, {
    width: 1200,
    margin: 2,
    errorCorrectionLevel: "M",
    color: { dark: "#0C0B10", light: "#FFFFFF" },
  });

  console.log(`Saved ${file}\n→ ${url}`);
}

main();
