export async function fetchArticles() {
  const url = new URL("http://localhost:1337/api/articles?populate=*");
  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(
      `Failed to fetch articles: ${res.status} ${res.statusText}`,
    );
  }
  const data = await res.json();
  return data.data;
}

export async function fetchEmojis() {
  const url = new URL(`http://localhost:1337/api/reactions/kinds`);
  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Failed to fetch emoji: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data;
}

export async function setReaction(reactionType: string, articleId: string) {
  const url = new URL(
    `http://localhost:1337/api/reactions/set/${reactionType}/collection/api::article.article/${articleId}`,
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
) {
  const url = new URL(
    `http://localhost:1337/api/reactions/list/${reactionType}/collection/api::article.article/${articleId}`,
  );
  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(
      `Failed to fetch reactions: ${res.status} ${res.statusText}`,
    );
  }
  const data = await res.json();
  return data.length;
}
