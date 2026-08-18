// Скачивает все Lovable-ассеты (.asset.json) в public/, чтобы статическая
// сборка работала на любом хостинге (reg.ru и т.п.) без CDN Lovable.
import { readdir, readFile, mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const BASES = [
  process.env.ASSET_BASE_URL,
  "https://remont-resheniya.lovable.app",
  "https://project--c8097a1c-3859-4731-871c-12cd1e5f3acf.lovable.app",
].filter(Boolean);

async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, out);
    else if (e.name.endsWith(".asset.json")) out.push(p);
  }
  return out;
}

const pointers = await walk(path.join(ROOT, "src", "assets"));
let ok = 0;
for (const p of pointers) {
  const { url } = JSON.parse(await readFile(p, "utf8"));
  const dest = path.join(ROOT, "public", url.replace(/^\//, ""));
  try {
    if ((await stat(dest)).size > 0) { ok++; continue; }
  } catch {}
  let saved = false;
  for (const base of BASES) {
    try {
      const res = await fetch(base + url);
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      await mkdir(path.dirname(dest), { recursive: true });
      await writeFile(dest, buf);
      saved = true;
      break;
    } catch {}
  }
  if (saved) ok++;
  else console.warn("НЕ СКАЧАНО:", url);
}
console.log(`Ассетов готово: ${ok}/${pointers.length}`);
