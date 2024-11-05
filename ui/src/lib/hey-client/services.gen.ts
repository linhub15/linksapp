// This file is auto-generated by @hey-api/openapi-ts

import {
  createClient,
  createConfig,
  type Options,
} from "@hey-api/client-fetch";
import type {
  CreateLinkData,
  CreateLinkError,
  CreateLinkResponse,
  CreatePageData,
  CreatePageError,
  CreatePageResponse,
  DeleteLinkData,
  DeleteLinkError,
  DeleteLinkResponse,
  GenerateHtmlData,
  GenerateHtmlError,
  GenerateHtmlResponse,
  GetBySlugData,
  GetBySlugError,
  GetBySlugResponse,
  GetPageData,
  GetPageError,
  GetPageResponse,
  ListLinksError,
  ListLinksResponse,
  ListPagesError,
  ListPagesResponse,
  UpdatePageData,
  UpdatePageError,
  UpdatePageResponse,
} from "./types.gen.ts";

export const client = createClient(createConfig());

export const listLinks = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    ListLinksResponse,
    ListLinksError,
    ThrowOnError
  >({
    ...options,
    url: "/links",
  });
};

/**
 * Create a new link
 */
export const createLink = <ThrowOnError extends boolean = false>(
  options: Options<CreateLinkData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    CreateLinkResponse,
    CreateLinkError,
    ThrowOnError
  >({
    ...options,
    url: "/pages/{pageId}/links",
  });
};

/**
 * Delete a link
 */
export const deleteLink = <ThrowOnError extends boolean = false>(
  options: Options<DeleteLinkData, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<
    DeleteLinkResponse,
    DeleteLinkError,
    ThrowOnError
  >({
    ...options,
    url: "/pages/{pageId}/links/{id}",
  });
};

export const listPages = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    ListPagesResponse,
    ListPagesError,
    ThrowOnError
  >({
    ...options,
    url: "/pages",
  });
};

/**
 * Create a page
 */
export const createPage = <ThrowOnError extends boolean = false>(
  options?: Options<CreatePageData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    CreatePageResponse,
    CreatePageError,
    ThrowOnError
  >({
    ...options,
    url: "/pages",
  });
};

export const getPage = <ThrowOnError extends boolean = false>(
  options: Options<GetPageData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetPageResponse,
    GetPageError,
    ThrowOnError
  >({
    ...options,
    url: "/pages/{id}",
  });
};

/**
 * Update a page
 */
export const updatePage = <ThrowOnError extends boolean = false>(
  options: Options<UpdatePageData, ThrowOnError>,
) => {
  return (options?.client ?? client).put<
    UpdatePageResponse,
    UpdatePageError,
    ThrowOnError
  >({
    ...options,
    url: "/pages/{id}",
  });
};

/**
 * Generate static HTML for a specific page
 */
export const generateHtml = <ThrowOnError extends boolean = false>(
  options?: Options<GenerateHtmlData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    GenerateHtmlResponse,
    GenerateHtmlError,
    ThrowOnError
  >({
    ...options,
    url: "/html/generate",
  });
};

/**
 * View a published link page
 */
export const getBySlug = <ThrowOnError extends boolean = false>(
  options: Options<GetBySlugData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetBySlugResponse,
    GetBySlugError,
    ThrowOnError
  >({
    ...options,
    url: "/{slug}",
  });
};
