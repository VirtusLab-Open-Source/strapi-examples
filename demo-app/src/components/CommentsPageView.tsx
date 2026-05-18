import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { fetchArticles } from "../lib/strapi-reactions";
import {
  fetchCommentsFlat,
  postComment,
  reportCommentAbuse,
} from "../lib/strapi-comments";
import type { Article } from "../types/articles";
import type {
  AbuseReportPayload,
  CommentAuthor,
  StrapiComment,
} from "../types/comments";
import { REPORT_PRESETS } from "../lib/strapi-comments";

function CommentsPageView() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [listError, setListError] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles()
      .then((data) => setArticles(data))
      .catch((err: unknown) => {
        setListError(
          err instanceof Error ? err.message : "Failed to load articles.",
        );
      });
  }, []);

  if (listError) {
    return (
      <div>
        <p role="alert">{listError}</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div>
        <p>Loading articles…</p>
      </div>
    );
  }

  return (
    <main>
      {articles.map((article) => (
        <ArticleWithComments key={article.documentId} article={article} />
      ))}
    </main>
  );
}

function ArticleWithComments({ article }: { article: Article }) {
  const firstRich = article.blocks.find(
    (b): b is Extract<typeof b, { __component: "shared.rich-text" }> =>
      b.__component === "shared.rich-text",
  );

  return (
    <article
      style={{
        textAlign: "left",
        marginBottom: "2.5rem",
        paddingBottom: "2rem",
        borderBottom: "1px solid #ccc",
      }}
    >
      <h1 style={{ fontSize: "1.75rem" }}>{article.title}</h1>
      <p style={{ opacity: 0.85 }}>{article.description}</p>
      {firstRich ? (
        <div style={{ margin: "1rem 0" }}>
          <ReactMarkdown>{firstRich.body}</ReactMarkdown>
        </div>
      ) : null}
      <CommentsBlock documentId={article.documentId} />
    </article>
  );
}

function CommentsBlock({ documentId }: { documentId: string }) {
  const [comments, setComments] = useState<StrapiComment[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    fetchCommentsFlat(documentId)
      .then((data) => {
        setComments(data);
        setError(null);
      })
      .catch((err: unknown) => {
        setError(
          err instanceof Error ? err.message : "Failed to load comments.",
        );
      });
  }, [documentId]);

  useEffect(() => {
    reload();
  }, [reload]);

  const handleReport = async (
    commentId: number,
    report: AbuseReportPayload,
  ) => {
    try {
      await reportCommentAbuse(documentId, commentId, report);
      reload();
    } catch (e: unknown) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Report failed.");
    }
  };

  const handlePost = async (author: CommentAuthor, content: string) => {
    await postComment(documentId, author, content);
    reload();
  };

  if (error) {
    return <p role="alert">{error}</p>;
  }
  if (comments === null) {
    return <p>Loading comments…</p>;
  }

  return (
    <section>
      <h2 style={{ fontSize: "1.25rem", marginTop: "1.5rem" }}>Comments</h2>
      <ul style={{ listStyle: "none", padding: 0, margin: "1rem 0" }}>
        {comments.map((comment) => (
          <li
            key={comment.id}
            style={{
              display: "flex",
              gap: "0.75rem",
              padding: "0.75rem 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <div
              aria-hidden
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#e5e5e5",
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <strong>
                {comment.blocked ? "Comment blocked" : comment.author.name}
              </strong>
              <p
                style={{
                  margin: "0.25rem 0 0",
                  opacity: comment.blocked ? 0.5 : 1,
                }}
              >
                {comment.blocked ? "—" : comment.content}
              </p>
              <div
                style={{
                  marginTop: "0.35rem",
                  fontSize: "0.85rem",
                  opacity: 0.7,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  flexWrap: "wrap",
                }}
              >
                <time dateTime={comment.createdAt}>{comment.createdAt}</time>
                {!comment.blocked ? (
                  <ReportCommentMenu
                    onReport={(report) => handleReport(comment.id, report)}
                  />
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {comments.length === 0 ? (
        <p style={{ opacity: 0.75 }}>No comments yet.</p>
      ) : null}
      <NewCommentForm onSubmit={handlePost} />
    </section>
  );
}

function ReportCommentMenu({
  onReport,
}: {
  onReport: (report: AbuseReportPayload) => void | Promise<void>;
}) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      Report:
      <select
        defaultValue=""
        onChange={(e) => {
          const idx = e.target.selectedIndex;
          if (idx <= 0) return;
          const preset = REPORT_PRESETS[idx - 1];
          void onReport({
            reason: preset.reason,
            content: preset.content,
          });
          e.target.selectedIndex = 0;
        }}
      >
        <option value="">Choose reason…</option>
        {REPORT_PRESETS.map((p) => (
          <option key={p.reason} value={p.reason}>
            {p.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function NewCommentForm({
  onSubmit,
}: {
  onSubmit: (author: CommentAuthor, content: string) => void | Promise<void>;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const author: CommentAuthor = {
        id: email.replace(/@/g, "_"),
        name,
        email,
      };
      await onSubmit(author, content);
      setName("");
      setEmail("");
      setContent("");
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={(e) => void handleSubmit(e)}
      style={{
        marginTop: "1.5rem",
        display: "grid",
        gap: "0.75rem",
        maxWidth: 480,
      }}
    >
      <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Add a comment</h3>
      <label style={{ display: "grid", gap: 4, textAlign: "left" }}>
        Name
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={submitting}
        />
      </label>
      <label style={{ display: "grid", gap: 4, textAlign: "left" }}>
        Email
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
        />
      </label>
      <label style={{ display: "grid", gap: 4, textAlign: "left" }}>
        Content
        <textarea
          required
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={submitting}
        />
      </label>
      <button type="submit" disabled={submitting}>
        {submitting ? "Sending…" : "Post comment"}
      </button>
    </form>
  );
}

export default CommentsPageView;
