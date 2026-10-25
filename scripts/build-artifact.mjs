// Builds a single self-contained page for hosts that add their own
// <html>/<head>/<body> wrapper: strips the wrapper, swaps the bundled fonts
// for Google Fonts and drops the app-only tags.
import { readFileSync, writeFileSync } from 'node:fs';

const out = process.argv[2] || 'dist/candy-burst.html';
const wrapper = /^(<!doctype html>|<html lang="en">|<head>|<\/head>|<body>|<\/body>|<\/html>|<meta charset="utf-8">|<meta name="viewport".*)$/;
const appOnly = /^<(link rel="(manifest|apple-touch-icon|icon)"|meta name="(theme-color|apple-mobile-web-app-.*|mobile-web-app-capable)")/;
const google = '<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Lilita+One&display=swap" rel="stylesheet">';

const lines = readFileSync('www/index.html', 'utf8').split(/\r?\n/)
  .filter(l => !wrapper.test(l) && !appOnly.test(l))
  .map(l => l.startsWith('<link rel="stylesheet" href="fonts/fonts.css">') ? google : l);

writeFileSync(out, lines.join('\n'));
console.log('wrote', out);
