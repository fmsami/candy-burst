// Copies the game's fonts into www/fonts so the app works offline.
import { mkdirSync, copyFileSync, writeFileSync } from 'node:fs';

const out = 'www/fonts';
mkdirSync(out, { recursive: true });

const faces = [
  ['Fredoka', 'fredoka', [400, 500, 600, 700]],
  ['Lilita One', 'lilita-one', [400]],
];

let css = '';
for (const [family, pkg, weights] of faces) {
  for (const w of weights) {
    const file = `${pkg}-latin-${w}-normal.woff2`;
    copyFileSync(`node_modules/@fontsource/${pkg}/files/${file}`, `${out}/${file}`);
    css += `@font-face{font-family:'${family}';font-style:normal;font-weight:${w};font-display:swap;src:url(${file}) format('woff2')}\n`;
  }
}
writeFileSync(`${out}/fonts.css`, css);
console.log('fonts copied');
