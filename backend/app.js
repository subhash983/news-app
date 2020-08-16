const express = require("express");
const config = require("./config");
const path = require("path");
const axios = require("axios");
// const CircularJSON = require('circular-json');

const app = express();

//Middleware
app.use(express.json());

app.get("/api/news", async (req, res) => {
  try {
    const { country, search } = req.query;
    if (!country && !search) {
      return res
        .status(400)
        .send("Please provide atlesat country or sarch term");
    }
    let news = await axios.get(
      `${config.NEWS_BASE_URL}?apiKey=${config.NEWS_API_KEY}&${
        search && `q=${search}`
      }&${country && `country=${country}`}`
    );
    res.send(news.data);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
});

app.listen(config.PORT, () =>
  console.log(`Server running on port ${config.PORT}`)
);
