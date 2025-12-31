import { readdir } from "fs/promises";
import { join, extname } from "path";
import { pathToFileURL } from "url";

async function loadHooks() {
  const dir = __dirname;
  const files = await readdir(dir, { withFileTypes: true });

  for (const file of files) {
    if (!file.isFile()) continue;
    if (file.name === "index.ts" || file.name === "index.js") continue;

    const ext = extname(file.name);
    if (ext !== ".ts" && ext !== ".js") continue;

    const fileUrl = pathToFileURL(join(dir, file.name)).href;
    await import(fileUrl);
  }
}

loadHooks();
