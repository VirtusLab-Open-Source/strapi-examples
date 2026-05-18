/** Autor komentarza (np. użytkownik generyczny spoza Strapi) */
export type CommentAuthor = {
  id: number | string;
  name: string;
  email: string;
};

export type ReportReason = "BAD_WORDS" | "OTHER" | "DISCRIMINATION";

export type AbuseReportPayload = {
  reason: ReportReason;
  content: string;
};

/** Komentarz z endpointu `/flat` pluginu strapi-plugin-comments */
export type StrapiComment = {
  id: number;
  content: string;
  createdAt: string;
  author: CommentAuthor;
  blocked: boolean;
  threadOf?: number | null;
};
