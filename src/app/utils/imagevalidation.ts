import { FileRejection } from "@mantine/dropzone";

import { IMessages } from "../[locale]/messages";

export const MAX_FILE_SIZE = 1000000; // 1 Mb
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export function ImageError(
  file: FileRejection[] | null,
  lang?: IMessages,
): {
  setError: string | undefined;
} {

  if (!file) {
    return {
      setError: lang?.validation.imagerequired,
    };
  }
  if (file?.[0].errors[0].code === "file-too-large") {
    return {
      setError: lang?.validation.imagesize,
    };
  }

  if (file?.[0].errors[0].code === "file-invalid-type") {
    return {
      setError: lang?.validation.imagenotvalid,
    };
  }

  return { setError: undefined };
}
