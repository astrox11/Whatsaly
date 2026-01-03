import { execSync } from "child_process";
import { cwd } from "process";

try {
  execSync("bun tsc", {
    cwd: cwd(),
    stdio: "ignore",
  });
} catch {
  /* */
}
