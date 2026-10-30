import { defineConfig } from 'astro/config';

// Override these together when moving the group into the MMLab website.
const base = process.env.GROUP_BASE_PATH || '/group/';
if (!base.startsWith('/') || !base.endsWith('/')) {
  throw new Error('GROUP_BASE_PATH must begin and end with /');
}

export default defineConfig({
  site: process.env.GROUP_SITE_URL || 'https://duowuyms.github.io',
  base,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
