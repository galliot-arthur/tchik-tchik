import { NextResponse } from "next/server";
import { z } from "zod";

export const apiError = z.object({
  message: z.string(),
  status: z.number(),
  //attribute?: string;
  //value?: string;
});

export type ApiError = z.infer<typeof apiError>;

/* const formatError = (e: StructError): ApiError => {
  const { key, value, type } = e;

  const error = {
    status: 404,
  } as ApiError;

  if (value === undefined) {
    error.message = `${key}_required`;
    error.attribute = key;
  } else if (type === "never") {
    error.message = `attribute_unknown`;
    error.attribute = key;
  } else {
    error.message = `${key}_invalid`;
    error.attribute = key;
    error.value = value;
  }

  return error;
}; */

export const handleApiError = () =>
  NextResponse.json(
    { message: "api_global_error", status: 500 },
    { status: 500, headers: { "Content-Type": "application/json" } }
  );

export const notFoundError = (element: string) =>
  NextResponse.json(
    { message: `${element}_not_found`, status: 404 },
    { status: 404, headers: { "Content-Type": "application/json" } }
  );

export const badRequestError = (element: string) =>
  NextResponse.json(
    { message: `${element}_bad_request`, status: 400 },
    { status: 400, headers: { "Content-Type": "application/json" } }
  );

/* export const forbiddenError = (element: string) =>
  NextResponse.json(
    { message: `${element}_forbidden`, status: 403 },
    { status: 403, headers: { "Content-Type": "application/json" } }
  ); */
