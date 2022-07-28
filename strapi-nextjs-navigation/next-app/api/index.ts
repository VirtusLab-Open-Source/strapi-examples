import { NavigationItemFlat, NavigationItemTree } from "../types/navigation";

export const fetchMainNavigation = async (idOrSlug: string | number) => {
  const res = await fetch(`http://localhost:1337/api/navigation/render/${idOrSlug}?type=TREE`)
  const data: NavigationItemTree[] = await res.json();
  return data;
}

export const fetchFooterNavigation = async () => {
  const res = await fetch("http://localhost:1337/api/navigation/render/2?type=FLAT");
  const data: NavigationItemFlat[] = await res.json();
  return data;
}