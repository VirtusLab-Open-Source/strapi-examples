import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { fetchPageByPath } from "../lib/strapi-navigation";
import type { StrapiNavigationPage } from "../types/navigation";

export function NavigationPageView() {
  const pathname = useRouterState({ select: (page) => page.location.pathname });

  return (
    <>
      <ul>
        {["home", "about", "more"].map((page, index) => (
          <li key={index}>
            <Link to="/$" params={{ _splat: page }}>
              {page.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
      <NavigationPageBody pathname={pathname} />
    </>
  );
}

function NavigationPageBody({ pathname }: { pathname: string }) {
  const [page, setPage] = useState<StrapiNavigationPage | null | undefined>(
    undefined,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchPageByPath(pathname, signal)
      .then((page) => {
        setPage(page);
      })
      .catch((error: unknown) => {
        if (!(error instanceof Error && error.name === "AbortError")) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to load page from Strapi.",
          );
        }
      });
    return () => {
      controller.abort();
    };
  }, [pathname]);

  if (error) {
    return <p role="alert">{error}</p>;
  }
  if (page === undefined) {
    return <p>Loading…</p>;
  }
  if (!page) {
    return <p>No page is linked to this path in Strapi navigation.</p>;
  }

  return (
    <article className="navigation-page">
      <h1>{page.title}</h1>
      {page.content ? <ReactMarkdown>{page.content}</ReactMarkdown> : null}
    </article>
  );
}
