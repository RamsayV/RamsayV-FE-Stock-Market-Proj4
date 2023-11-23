import React, { useState, useEffect } from 'react';


const StockNews = () => {
  const [articles, setArticles] = useState(null); // Start with null to indicate not loaded
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockMarketNews = async () => {
      setIsLoading(true);
      const url = 'https://global-stock-news.p.rapidapi.com/feed?symbol=AAPL%2C%20AMZN%2C%20MSFT';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API,
          'X-RapidAPI-Host': 'global-stock-news.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        if (data.articles) {
          setArticles(data.articles);
        } else {
          throw new Error('No articles found');
        }
      } catch (error) {
        console.error('Fetching global stock market news failed:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockMarketNews();
  }, []);

  if (error) {
    return <div>Error fetching news: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!articles) {
    return <div>No articles to display</div>;
  }

  return (
    <div>
      <h1>Global Stock Market News</h1>
      <div>
        {articles.map((article) => (
          <div key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.summary}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
            <img src={article.thumbnail} alt="Article Thumbnail" />
            <p>Published on: {new Date(article.publishedDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockNews;