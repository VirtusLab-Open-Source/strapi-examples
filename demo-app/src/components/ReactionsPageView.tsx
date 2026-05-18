import { useEffect, useState } from "react";
import { fetchEmojis, setReaction } from "../lib/strapi-reactions";
import ReactMarkdown from "react-markdown";
import { useArticles } from "../hooks/useArticles";
import type { Reaction } from "../types/reactions";

function ReactionsPageView() {
  const { articles, isLoading, error } = useArticles();
  const [emojis, setEmojis] = useState<Reaction[]>([]);

  useEffect(() => {
    fetchEmojis()
      .then((data) => {
        setEmojis(data);
      })
      .catch((error: unknown) => {
        console.error(error);
      });
  }, []);

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (isLoading) {
    return <p>Loading articles…</p>;
  }

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
              return (
                <button
                  key={emoji.name}
                  onClick={() => setReaction(emoji.name, article.documentId)}
                >
                  {emoji.emoji}
                  {emoji.name}
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
