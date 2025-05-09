export const MAX_FILE_SIZE = 1000000; // 1 Mb
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export function ImageError(file: File | null): {
  setError: string | undefined;
} {
  if (file?.size! >= MAX_FILE_SIZE) {
    return {
      setError: "Image file size should be less than 1 Mb",
    };
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(file?.type!)) {
    return {
      setError: "Image has not valid file type",
    };
  }

  return { setError: undefined };
}
