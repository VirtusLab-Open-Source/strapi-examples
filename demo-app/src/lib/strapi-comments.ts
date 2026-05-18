import type {
  AbuseReportPayload,
  CommentAuthor,
  StrapiComment,
} from "../types/comments";
import { strapiOriginUrl, ARTICLE_CONTENT_RELATION } from "./utils";

export const REPORT_PRESETS: Array<AbuseReportPayload & { label: string }> = [
  {
    reason: "BAD_WORDS",
    content: "Comment reported for containing bad words",
    label: "Report: bad words",
  },
  {
    reason: "DISCRIMINATION",
    content: "Comment reported for being discriminative",
    label: "Report: discrimination",
  },
  {
    reason: "OTHER",
    content: "Comment reported for unspecified reason",
    label: "Report: other",
  },
];

export function articleCommentsBaseUrl(documentId: string): string {
  return `${strapiOriginUrl()}/api/comments/${ARTICLE_CONTENT_RELATION}:${documentId}`;
}

export async function fetchCommentsFlat(
  documentId: string,
): Promise<StrapiComment[]> {
  const url = `${articleCommentsBaseUrl(documentId)}/flat`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load comments: ${res.status} ${res.statusText}`);
  }
  const json: { data?: StrapiComment[] } = await res.json();
  return json.data ?? [];
}

export async function postComment(
  documentId: string,
  author: CommentAuthor,
  content: string,
): Promise<void> {
  const res = await fetch(articleCommentsBaseUrl(documentId), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ author, content }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(
      `Failed to post comment: ${res.status} ${res.statusText}${detail ? ` — ${detail}` : ""}`,
    );
  }
}

export async function reportCommentAbuse(
  documentId: string,
  commentId: number,
  report: AbuseReportPayload,
): Promise<void> {
  const url = `${articleCommentsBaseUrl(documentId)}/comment/${commentId}/report-abuse`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(report),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(
      `Failed to report comment: ${res.status} ${res.statusText}${detail ? ` — ${detail}` : ""}`,
    );
  }
}
