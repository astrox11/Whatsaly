import path from "path";
import { execSync } from "child_process";

try {
  execSync("bun run build", {
    cwd: path.join("node_modules", "baileys"),
    stdio: "ignore",
  });
} catch {
  /* */
}
