// Salin berkas font dari node_modules ke public/fonts.
// Font dibundel bersama situs — tidak pernah dimuat dari CDN.
// Jalankan lagi dengan: npm run sync-fonts
import { copyFileSync, mkdirSync } from 'node:fs';

const files = [
  ['@fontsource/barlow-condensed/files/barlow-condensed-latin-500-normal.woff2', 'barlow-condensed-500.woff2'],
  ['@fontsource/barlow-condensed/files/barlow-condensed-latin-600-normal.woff2', 'barlow-condensed-600.woff2'],
  ['@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2', 'ibm-plex-mono-400.woff2'],
  ['@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2', 'ibm-plex-mono-500.woff2'],
];

mkdirSync('public/fonts', { recursive: true });
for (const [from, to] of files) {
  copyFileSync(new URL(`../node_modules/${from}`, import.meta.url), `public/fonts/${to}`);
  console.log(`fonts: ${to}`);
}
