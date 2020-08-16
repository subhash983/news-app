import React, { useEffect, useState } from "react";

function News() {
  const [news, setNews] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const getNews = async (url) => {
    let responsePromise = await fetch(url);
    let news = await responsePromise.json();
    setNews(news);
    setLoading(false);
  };

  const searchNews = async function (event) {
    setLoading(true);
    if (searchTerm) {
      getNews("/api/news?search=" + searchTerm);
    } else {
      getNews("/api/news?country=gb");
    }
  };

  useEffect(() => {
    getNews("/api/news?country=gb");
  }, []);

  const checkEnterPressed = (event) => {
    let code = event.keyCode || event.which;
    if (code === 13) {
      searchNews(event);
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        "Loading..."
      ) : (
        <div data-testid={"news-container"}>
          <div className="search">
            <input
              type="textbox"
              className={"search-text"}
              placeholder="Enter your search term"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyPress={checkEnterPressed}
            ></input>
            <button className={"search-button"} onClick={searchNews}>
              {"Search"}
            </button>
          </div>
          <div className={"news-container"}>
            {news.totalResults
              ? news.articles.map((article, index) => (
                  <article key={`article-${index}`} className={"news"}>
                    <div className={"news-data"}>
                      <div className={"news-headline"}>
                        <h3>
                          <a href={article.url} target="_blank">
                            {article.title}
                          </a>
                          <div className={"news-published-info"}>
                            {`${article.source.name} ${new Date(
                              article.publishedAt
                            ).toLocaleString()}`}
                          </div>
                        </h3>
                      </div>
                      <div className={"news-description"}>
                        <p>{article.description}</p>
                      </div>
                    </div>

                    <div className={"news-image"}>
                      <img src={article.urlToImage} alt={article.title} />
                    </div>
                  </article>
                ))
              : "No results Found"}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default News;
