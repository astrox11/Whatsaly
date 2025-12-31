import fs from "fs";
import path from "path";
import { execSync } from "child_process";

try {
  const astroPath = path.join(process.cwd(), "service");
  if (fs.existsSync(astroPath)) {
    execSync("bun install", {
      cwd: astroPath,
      stdio: "inherit",
    });
    execSync("bun run build", {
      cwd: astroPath,
      stdio: "inherit",
    });
  }
} catch (error) {
  console.error("astro build error:", error);
}
