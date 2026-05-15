type StrapiDocumentMeta = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
};

/**
 * Rekord reakcji (np. z pluginu reactions) — odpowiednik Twojego obiektu.
 */
export type Reaction = StrapiDocumentMeta & {
  name: string;
  slug: string;
  emoji: string;
  emojiFallbackUrl: string;
  /** i18n: brak wersji językowej lub wyłączone */
  locale: string | null;
  /**
   * Ikona z biblioteki mediów po populate; bez populate często null lub samo id.
   * Tu: null.
   */
  icon: unknown | null; // albo: StrapiUploadFile | null — gdy masz typ pliku z uploadu
};
