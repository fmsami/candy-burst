// Draws the Candy Burst icon and renders every size the web app and the
// native projects need. Native icons/splashes are produced from assets/ by
// `npx capacitor-assets generate`.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const bg = `
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#ffb3d9"/><stop offset=".55" stop-color="#ff5fa8"/><stop offset="1" stop-color="#7d4fe0"/>
  </linearGradient>
  <radialGradient id="glow" cx=".22" cy=".14" r=".7">
    <stop offset="0" stop-color="#ffe9a8" stop-opacity=".85"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/>
  </radialGradient>`;

const candyDefs = `
  <radialGradient id="ball" cx=".35" cy=".3" r=".78">
    <stop offset="0" stop-color="#ffd0dc"/><stop offset=".42" stop-color="#ff3b5c"/><stop offset="1" stop-color="#9e0f2c"/>
  </radialGradient>
  <linearGradient id="end" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#ffe066"/><stop offset="1" stop-color="#ff9220"/>
  </linearGradient>
  <clipPath id="clip"><circle cx="512" cy="512" r="250"/></clipPath>`;

const star = (x, y, r) => `<path d="M${x} ${y - r} Q${x + r * .18} ${y - r * .18} ${x + r} ${y} Q${x + r * .18} ${y + r * .18} ${x} ${y + r} Q${x - r * .18} ${y + r * .18} ${x - r} ${y} Q${x - r * .18} ${y - r * .18} ${x} ${y - r}Z" fill="#fff"/>`;

const candy = `
  <g stroke="#b85200" stroke-width="14" stroke-linejoin="round" fill="url(#end)">
    <path d="M300 512 L130 372 Q190 512 130 652 Z"/>
    <path d="M724 512 L894 372 Q834 512 894 652 Z"/>
  </g>
  <circle cx="512" cy="512" r="250" fill="url(#ball)"/>
  <g clip-path="url(#clip)"><g transform="rotate(-35 512 512)" fill="#fff" opacity=".92">
    ${[-3, -2, -1, 0, 1, 2, 3].map(k => `<rect x="${487 + k * 105}" y="200" width="50" height="624" rx="25"/>`).join('')}
  </g></g>
  <circle cx="512" cy="512" r="250" fill="none" stroke="#7a0820" stroke-width="14"/>
  <ellipse cx="420" cy="380" rx="120" ry="52" transform="rotate(-32 420 380)" fill="#fff" opacity=".6"/>`;

// full icon: background + candy + sparkles. scale shrinks the candy toward the centre.
const svg = ({ withBg = true, withCandy = true, scale = 1, size = 1024, sparkles = true }) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 1024 1024">
  <defs>${bg}${candyDefs}</defs>
  ${withBg ? '<rect width="1024" height="1024" fill="url(#bg)"/><rect width="1024" height="1024" fill="url(#glow)"/>' : ''}
  ${withCandy ? `<g transform="translate(512 512) scale(${scale}) translate(-512 -512)">${candy}${sparkles ? star(800, 250, 46) + star(225, 800, 34) + star(850, 760, 24) : ''}</g>` : ''}
</svg>`;

const png = (opts, file) => sharp(Buffer.from(svg(opts))).png().toFile(file);

mkdirSync('www/icons', { recursive: true });
mkdirSync('assets', { recursive: true });

await Promise.all([
  // web / PWA
  png({ size: 192 }, 'www/icons/icon-192.png'),
  png({ size: 512 }, 'www/icons/icon-512.png'),
  png({ size: 512, scale: .78 }, 'www/icons/maskable-512.png'),
  png({ size: 180 }, 'www/icons/apple-touch-icon.png'),
  png({ size: 64 }, 'www/icons/favicon.png'),
  // sources for native icons and splash screens
  png({ size: 1024 }, 'assets/icon-only.png'),
  png({ size: 1024, withBg: false, scale: .62 }, 'assets/icon-foreground.png'),
  png({ size: 1024, withCandy: false }, 'assets/icon-background.png'),
  png({ size: 2732, scale: .32, sparkles: false }, 'assets/splash.png'),
  png({ size: 2732, scale: .32, sparkles: false }, 'assets/splash-dark.png'),
]);
console.log('icons generated');
