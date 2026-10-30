import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = path.resolve('dist');
const base = process.env.GROUP_BASE_PATH || '/group/';
const failures = [];
let checked = 0;
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? files(path.join(dir, entry.name))
          : path.join(dir, entry.name),
      ),
    )
  ).flat();
}
const pages = (await files(root)).filter((file) => file.endsWith('.html'));
assert(
  pages.length >= 5,
  'Expected four content pages and a 404 page. Run npm run build first.',
);
for (const file of pages) {
  const html = await readFile(file, 'utf8');
  const currentPath = `${base}${path
    .relative(root, file)
    .replaceAll(path.sep, '/')
    .replace(/index\.html$/, '')}`;
  for (const match of html.matchAll(/\b(?:href|src|data-src)="([^"<>]+)"/g)) {
    const value = match[1].replaceAll('&amp;', '&');
    if (/^(?:https?:|mailto:|data:)/.test(value)) continue;
    const target = new URL(value, `https://group.invalid${currentPath}`);
    if (!target.pathname.startsWith(base)) {
      failures.push(`${file}: escapes base ${value}`);
      continue;
    }
    let destination = path.join(
      root,
      decodeURIComponent(target.pathname.slice(base.length)),
    );
    try {
      if ((await stat(destination)).isDirectory())
        destination = path.join(destination, 'index.html');
      await stat(destination);
      if (target.hash && destination.endsWith('.html')) {
        const contents = await readFile(destination, 'utf8');
        const id = decodeURIComponent(target.hash.slice(1));
        if (!contents.includes(`id="${id}"`))
          failures.push(`${file}: missing anchor ${value}`);
      }
      checked++;
    } catch {
      failures.push(`${file}: missing target ${value}`);
    }
  }
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else
  console.log(
    `Verified ${checked} internal links/media targets across ${pages.length} pages at ${base}`,
  );
