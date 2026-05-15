/** Pola dokumentu Strapi v5 */
type StrapiDocumentMeta = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
};

type StrapiImageFormat = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number; // KB w API Strapi
  sizeInBytes: number;
  url: string;
};

/** Plik z biblioteki mediów (upload) */
type StrapiUploadFile = StrapiDocumentMeta & {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
    [key: string]: StrapiImageFormat | undefined;
  } | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: Record<string, unknown> | null;
  /** W zależności od wersji / konfiguracji może być też obiekt; w Twoim przykładzie null */
  focalPoint: unknown;
};

type StrapiAuthor = StrapiDocumentMeta & {
  name: string;
  email: string;
};

type StrapiCategory = StrapiDocumentMeta & {
  name: string;
  slug: string;
  description: string | null;
};

/** Bloki dynamic zone — discriminated union po `__component` */
type ArticleBlock =
  | {
      __component: "shared.rich-text";
      id: number;
      body: string;
    }
  | {
      __component: "shared.quote";
      id: number;
      title: string;
      body: string;
    }
  | {
      __component: "shared.media";
      id: number;
      /** Po `populate` w query — sama struktura jak cover lub null */
      file?: StrapiUploadFile | null;
    }
  | {
      __component: "shared.slider";
      id: number;
      /** Po populate — tablica plików */
      files?: StrapiUploadFile[] | null;
    };

/** Artykuł jak w Twoim obiekcie (relacje rozwinęte) */
export type Article = StrapiDocumentMeta & {
  title: string;
  description: string;
  slug: string;
  cover: StrapiUploadFile | null;
  author: StrapiAuthor | null;
  category: StrapiCategory | null;
  blocks: ArticleBlock[];
};
