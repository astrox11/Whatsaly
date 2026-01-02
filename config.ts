export default {
  VERSION: (await import("./package.json")).version,
  BOT_NAME: process.env.BOT_NAME || "Whatsaly",
  API_PORT: parseInt(process.env.API_PORT || "8000", 10),
  DEBUG: process.env.DEBUG === "true" || false,
};
