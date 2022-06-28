export type Post = {
  id: number;
  attributes: {
    Title: string;
    Slug: string;
    Description: string;
    Content: string;
  }
}

export type Author = {
  id: number | string;
  name: string;
  email: string;
}

export type ReportReason = "BAD_WORDS" | "OTHER" | "DISCRIMINATION";
export type Report = {
  reason: ReportReason;
  content: string;
}

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  author: Author;
  blocked: boolean;
}