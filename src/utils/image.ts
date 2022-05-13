export function getImageUrl(path: string) {
  return new URL(path, import.meta.url).href;
}
