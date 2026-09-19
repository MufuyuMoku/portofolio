import { defineConfig } from 'astro/config';

// --- Pengaturan deploy GitHub Pages -----------------------------------------
// Kalau repo bernama `MufuyuMoku.github.io`  -> BASE = '/'
// Kalau repo bernama lain (mis. `porto`)     -> BASE = '/porto/'
const SITE = 'https://MufuyuMoku.github.io';
const BASE = '/portofolio/';
// ----------------------------------------------------------------------------

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
