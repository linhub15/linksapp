// This file is auto-generated by @hey-api/openapi-ts

import {
  createClient,
  createConfig,
  type Options,
} from "@hey-api/client-fetch";
import type {
  CreateLinkData,
  CreateLinkResponse,
  DeleteLinkData,
  DeleteLinkResponse,
  GenerateHtmlData,
  GetBySlugData,
  UpdateLinkData,
  UpdateLinkResponse,
} from "./types.gen.ts";

export const client = createClient(createConfig());

/**
 * Create a new link
 */
export const createLink = <ThrowOnError extends boolean = false>(
  options: Options<CreateLinkData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    CreateLinkResponse,
    unknown,
    ThrowOnError
  >({
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    url: "/pages/{page_id}/links",
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
    unknown,
    ThrowOnError
  >({
    ...options,
    url: "/pages/{page_id}/links/{id}",
  });
};

/**
 * Update a link
 */
export const updateLink = <ThrowOnError extends boolean = false>(
  options: Options<UpdateLinkData, ThrowOnError>,
) => {
  return (options?.client ?? client).put<
    UpdateLinkResponse,
    unknown,
    ThrowOnError
  >({
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    url: "/pages/{page_id}/links/{id}",
  });
};

/**
 * Generate static HTML for a specific page
 */
export const generateHtml = <ThrowOnError extends boolean = false>(
  options?: Options<GenerateHtmlData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<unknown, unknown, ThrowOnError>({
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    url: "/html/generate",
  });
};

/**
 * View a published link page
 */
export const getBySlug = <ThrowOnError extends boolean = false>(
  options: Options<GetBySlugData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<unknown, unknown, ThrowOnError>({
    ...options,
    url: "/{slug}",
  });
};
