import type {
  NavigationItemTree,
  StrapiNavigationPage,
} from "../types/navigation";
import { strapiOriginUrl } from "./utils";

export async function fetchPageByPath(
  pathname: string,
  signal: AbortSignal,
): Promise<StrapiNavigationPage | null> {
  const normalized =
    pathname === "/"
      ? "/home"
      : pathname.startsWith("/")
        ? pathname
        : `/${pathname}`;

  const url = new URL(`${strapiOriginUrl()}/api/navigation/render/navigation`);
  url.searchParams.set("path", normalized);

  const res = await fetch(url.toString(), { signal });
  if (!res.ok) {
    throw new Error(
      `Failed to load page from Strapi navigation: ${res.status} ${res.statusText}`,
    );
  }

  const data = (await res.json()) as NavigationItemTree[];
  const first = data[0];
  if (!first || first.type !== "INTERNAL") {
    return null;
  }
  const related = first.related as StrapiNavigationPage | null | undefined;
  return related ?? null;
}
