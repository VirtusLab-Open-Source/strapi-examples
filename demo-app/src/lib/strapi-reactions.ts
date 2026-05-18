import { ARTICLE_CONTENT_RELATION, strapiOriginUrl } from "./utils";

export async function fetchArticles(signal: AbortSignal) {
  const url = new URL(`${strapiOriginUrl()}/api/articles?populate=*`);
  const res = await fetch(url.toString(), { signal });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch articles: ${res.status} ${res.statusText}`,
    );
  }
  const data = await res.json();
  return data.data;
}

export async function fetchEmojis(signal: AbortSignal) {
  const url = new URL(`${strapiOriginUrl()}/api/reactions/kinds`);
  const res = await fetch(url.toString(), { signal });
  if (!res.ok) {
    throw new Error(`Failed to fetch emoji: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data;
}

export async function setReaction(reactionType: string, articleId: string) {
  const url = new URL(
    `${strapiOriginUrl()}/api/reactions/set/${reactionType}/collection/${ARTICLE_CONTENT_RELATION}/${articleId}`,
  );
  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "X-Reactions-Author": `user-${Math.random().toString(36).substring(2, 15)}`,
    },
  });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch reactions: ${res.status} ${res.statusText}`,
    );
  }
  const data = await res.json();
  return data.data;
}

export async function fetchArticleReactionsCount(
  reactionType: string,
  articleId: string,
  signal: AbortSignal,
) {
  const url = new URL(
    `${strapiOriginUrl()}/api/reactions/list/${reactionType}/collection/${ARTICLE_CONTENT_RELATION}/${articleId}`,
  );
  const res = await fetch(url.toString(), { signal });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch reactions: ${res.status} ${res.statusText}`,
    );
  }
  const data = await res.json();
  return data.length;
}
