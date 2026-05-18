export type NavigationItemInternalFlat = {
  order: number;
  id: number;
  title: string;
  type: "INTERNAL";
  path: string;
  uiRouterKey: string;
  menuAttached: boolean;
  related: unknown;
};

export type NavigationItemExternalFlat = {
  order: number;
  id: number;
  title: string;
  type: "EXTERNAL";
  externalPath: string;
  uiRouterKey: string;
  menuAttached: boolean;
};

export type NavigationItemFlat =
  | NavigationItemExternalFlat
  | NavigationItemInternalFlat;

export type NavigationItemTree = {
  order: number;
  id: number;
  title: string;
  type: "INTERNAL" | "EXTERNAL";
  path: string;
  uiRouterKey: string;
  menuAttached: boolean;
  related: unknown;
  items: NavigationItemTree[] | null;
};

export type StrapiNavigationPage = {
  id: number;
  documentId: string;
  title: string;
  name: string;
  content: string | null;
};
