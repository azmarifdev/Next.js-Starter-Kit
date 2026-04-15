import { copyFileSync, existsSync } from "node:fs";

if (!existsSync(".env.local")) {
  copyFileSync(".env.example", ".env.local");
  console.log("Created .env.local from .env.example");
} else {
  console.log(".env.local already exists");
}

console.log("Setup complete.");
console.log("1. Update .env.local if needed");
console.log("2. Run: pnpm dev");
