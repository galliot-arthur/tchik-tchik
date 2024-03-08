const mimetypes = [
  "image/jpeg",
  "image/png",
  //'image/svg+xml',
  //'application/pdf',
] as const;

export type MimeType = (typeof mimetypes)[number];

export const allowedMimetypes: readonly string[] = mimetypes;

export const imageExtensions: Record<MimeType, string> = {
  "image/jpeg": "jpeg",
  "image/png": "png",
  //'image/svg+xml': 'svg',
  //'application/pdf': 'pdf',
};

export function isAllowedMimeType(mimeType: string): mimeType is MimeType {
  return allowedMimetypes.includes(mimeType);
}

export const isFile = (data: FormDataEntryValue | null): data is File => {
  if (data === null) {
    return false;
  }

  const maybeFile = data as File;

  return "name" in maybeFile && "type" in maybeFile;
};

export const getPicture = (name: string | null | undefined) =>
  `/pictures/${name}`;
