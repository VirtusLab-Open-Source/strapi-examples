import { useEffect, useState } from "react";
import {
  fetchArticleReactionsCount,
  fetchArticles,
  fetchEmojis,
  setReaction,
} from "../lib/strapi-reactions";
import ReactMarkdown from "react-markdown";
import type { Article } from "../types/articles";
import type { Reaction } from "../types/reactions";

function ReactionsPageView() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [emojis, setEmojis] = useState<Reaction[]>([]);

  useEffect(() => {
    fetchArticles()
      .then((data) => setArticles(data))
      .catch((error: unknown) => {
        console.error(error);
      });
    fetchEmojis()
      .then((data) => {
        setEmojis(data);
      })
      .catch((error: unknown) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {articles.map((article) => {
        return (
          <article key={article.documentId}>
            <h1>{article.title}</h1>
            <span>
              <ReactMarkdown>{article.blocks[0].body}</ReactMarkdown>
            </span>

            {emojis.map((emoji) => {
              // const reactionsCount = fetchArticleReactionsCount(
              //   emoji.name,
              //   article.documentId,
              // );
              return (
                <button
                  key={emoji.name}
                  onClick={() => setReaction(emoji.name, article.documentId)}
                >
                  {emoji.emoji}
                  {emoji.name}
                  {/* {reactionsCount} */}
                </button>
              );
            })}
          </article>
        );
      })}
    </>
  );
}

export default ReactionsPageView;
