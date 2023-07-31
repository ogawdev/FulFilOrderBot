const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  BOT_TOKEN: process.env.BOT_TOKEN,
  DOMAIN: process.env.DOMAIN,
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  CHAT_ID: process.env.CHAT_ID,
  DEV_ID: process.env.DEV_ID,
};

module.exports = config;
