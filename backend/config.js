require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  NEWS_API_KEY: process.env.NEWS_API_KEY,
  NEWS_BASE_URL: "https://newsapi.org/v2/top-headlines",
};
