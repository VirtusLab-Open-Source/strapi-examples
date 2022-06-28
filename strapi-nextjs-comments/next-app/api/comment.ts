import { Author, Report } from "../types/comments";

export async function PostComment(postId: number, author: Author, content: string) {
  const body = JSON.stringify({ author, content });
  const res = await fetch(`http://localhost:1337/api/comments/api::post.post:${postId}`,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body,
    }
  );
}

export async function ReportComment(postId: number, commentId: number, report: Report) {
  const body = JSON.stringify(report);
  const res = await fetch(`http://localhost:1337/api/comments/api::post.post:${postId}/comment/${commentId}/report-abuse`,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body
    }
  );
 }

export async function GetComments(postId: number) {
  const res = await fetch(`http://localhost:1337/api/comments/api::post.post:${postId}`);
  const data = await res.json();
  return data;
}