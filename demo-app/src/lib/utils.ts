export function strapiOriginUrl() {
  return import.meta.env.STRAPI_URL ?? "http://localhost:1337";
}

export const ARTICLE_CONTENT_RELATION = "api::article.article";
