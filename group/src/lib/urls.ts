/** Every internal URL respects the configured GitHub Pages subdirectory. */
export function url(path = ''): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
