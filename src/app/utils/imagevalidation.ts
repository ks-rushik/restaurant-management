import { IMessages } from "../[locale]/messages";

export const MAX_FILE_SIZE = 1000000; // 1 Mb
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export function ImageError(
  file: File | null,
  lang?: IMessages,
): {
  setError: string | undefined;
} {
  if (!file) {
    return {
      setError: lang?.validation.imagerequired,
    };
  }
  if (file?.size! >= MAX_FILE_SIZE) {
    return {
      setError: lang?.validation.imagesize,
    };
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(file?.type!)) {
    return {
      setError: lang?.validation.imagenotvalid,
    };
  }

  return { setError: undefined };
}
