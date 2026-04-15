export const env = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || "Next.js Minimal Starter",
  mongodbUri: process.env.MONGODB_URI || "",
  mongodbDbName: process.env.MONGODB_DB_NAME || "nextjs_starter_template",
  sessionSecret: process.env.AUTH_SESSION_SECRET || "dev-only-secret"
};
