import slugify from "slugify";

export const getSlug = (title: string) =>
  slugify(title, {
    lower: true,
    strict: true,
  });
