import fs from "fs";
import path from "path";

const id = process.argv[2];
const name = process.argv[3] || id;
if (!id) {
  console.error("usage: node download-one.mjs <pinimgId> <filename>");
  process.exit(1);
}
const dir = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const folder = `${id.slice(0, 2)}/${id.slice(2, 4)}/${id.slice(4, 6)}/${id}`;
const sizes = ["1200x", "736x", "originals", "564x"];
const exts = ["jpg", "png", "webp"];

async function tryUrl(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Referer: "https://www.pinterest.com/",
    },
  });
  if (!res.ok) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 8000) return null;
  const sig = buf.subarray(0, 4).toString("hex");
  const ok =
    sig.startsWith("ffd8") ||
    sig === "89504e47" ||
    buf.subarray(0, 4).toString() === "RIFF";
  if (!ok) return null;
  return buf;
}

let saved = null;
for (const size of sizes) {
  for (const ext of exts) {
    const url = `https://i.pinimg.com/${size}/${folder}.${ext}`;
    const buf = await tryUrl(url);
    if (buf) {
      const out = path.join(dir, `${name}.${ext === "jpg" ? "jpg" : ext}`);
      fs.writeFileSync(out, buf);
      saved = { out, bytes: buf.length, url };
      break;
    }
  }
  if (saved) break;
}
if (!saved) {
  console.log("FAIL", id);
  process.exit(2);
}
console.log("OK", saved.bytes, saved.url);
