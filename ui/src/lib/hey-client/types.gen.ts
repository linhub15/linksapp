// This file is auto-generated by @hey-api/openapi-ts

export type Link = {
  id: string;
  href: string;
  label: string;
  newTab: boolean | null;
  createdAt: string | null;
  pageId: string;
};

export type LinkCreate = {
  href: string;
  label: string;
  newTab?: boolean | null;
};

export type LinkUpdate = {
  href: string;
  label: string;
  newTab?: boolean | null;
};

export type Page = {
  id: string;
  title: string;
  urlSlug: string;
  createdAt: string | null;
  updatedAt: string | null;
  publishedAt: string | null;
};

export type PageCreate = {
  /**
   * Alphnumeric characters and spaces only
   */
  title: string;
};

export type PageUpdate = {
  title: string;
};

export type ListLinksResponse = Array<Link>;

export type CreateLinkData = {
  body?: LinkCreate;
  path: {
    pageId: string;
  };
  query?: never;
};

export type CreateLinkResponse = string;

export type DeleteLinkData = {
  body?: never;
  path: {
    pageId: string;
    id: string;
  };
  query?: never;
};

export type DeleteLinkResponse = void;

export type UpdateLinkData = {
  body?: LinkUpdate;
  path: {
    pageId: string;
    id: string;
  };
  query?: never;
};

export type UpdateLinkResponse = "ok";

export type ListPagesResponse = Array<Page>;

export type CreatePageData = {
  body?: PageCreate;
};

export type CreatePageResponse = string;

export type GetPageData = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
};

export type GetPageResponse = Page;

export type UpdatePageData = {
  body?: PageUpdate;
  path: {
    id: string;
  };
  query?: never;
};

export type UpdatePageResponse = "ok";

export type GenerateHtmlData = {
  body?: {
    pageId: string;
  };
};

export type GetBySlugData = {
  body?: never;
  path: {
    slug: string;
  };
  query?: never;
};
