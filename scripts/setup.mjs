import { copyFileSync, existsSync } from "node:fs";

function ensureFromExample(targetFile) {
  if (existsSync(targetFile)) {
    console.log(`${targetFile} already exists`);
    return;
  }

  copyFileSync(".env.example", targetFile);
  console.log(`Created ${targetFile} from .env.example`);
}

ensureFromExample(".env");
ensureFromExample(".env.local");

console.log("\nSetup complete.");
console.log("Next steps:");
console.log("1. (Optional) Update .env.local values");
console.log("2. (Optional) Run: pnpm seed");
console.log("3. Start app: pnpm dev");
