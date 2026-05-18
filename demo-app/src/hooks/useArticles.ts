import { useCallback, useEffect, useState } from "react";
import { fetchArticles } from "../lib/strapi-reactions";
import type { Article } from "../types/articles";

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async (signal: AbortSignal) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchArticles(signal);
      setArticles(data);
    } catch (error: unknown) {
      if (signal.aborted) return;

      setArticles([]);
      setError(
        error instanceof Error ? error.message : "Failed to load articles.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const load = async () => {
      await refetch(signal);
    };

    load();

    return () => {
      controller.abort();
    };
  }, [refetch]);

  return { articles, isLoading, error, refetch };
}
