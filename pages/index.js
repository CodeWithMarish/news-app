import { useQuery } from "react-query";
import { useState } from "react";

const getNewsData = async ({ queryKey }) => {
  let page = queryKey[1];
  let res = await fetch(
    `https://newsapi.org/v2/top-headlines?page=${page}&country=in&category=business&apiKey=${process.env.NEWS_API_KEY}`
  );
  return res.json();
};

export default function Home() {
  const [page, setPage] = useState(1);

  const { isLoading, isError, isSuccess, data } = useQuery(
    ["news", page],
    getNewsData
  );
  console.log(data);
  if (isLoading) return <div className="center">Loading...</div>;
  else if (isError)
    return (
      <div className="center">Something went wrong, Please try again.</div>
    );
  return (
    <div className="container">
      <h1 className="text-center">News App</h1>
      <div className="actions">
        <button
          onClick={() => {
            if (page > 1) setPage(page - 1);
          }}
        >
          &larr;
        </button>
        <button
          onClick={() => {
            if (page < Math.ceil(data.totalResults / 20)) setPage(page + 1);
          }}
        >
          &rarr;
        </button>
      </div>
      {data.articles.map((d) => (
        <div className="news-card" key={d.title}>
          <h2>{d.title}</h2>
          <p>{d.description}</p>
        </div>
      ))}
      <div></div>
    </div>
  );
}
