# Candy Burst

A match-3 candy game for the web, Android and iPhone. The whole game is one HTML file (`www/index.html`); [Capacitor](https://capacitorjs.com) wraps it as native Android and iOS apps.

**Play now:** https://fmsami.github.io/candy-burst/ (on iPhone: open in Safari → Share → Add to Home Screen)

**Android app:** [download candy-burst.apk](https://github.com/fmsami/candy-burst/releases/latest/download/candy-burst.apk)

## Project layout

| Path | What it is |
|---|---|
| `www/` | The game: `index.html`, web app manifest, offline service worker, fonts, icons |
| `android/` | Native Android project (open in Android Studio) |
| `ios/` | Native iOS project (open in Xcode) |
| `assets/` | Source images for the native icons and splash screens |
| `scripts/` | Font copy, icon generation, and single-file page build |
| `.github/workflows/android.yml` | Builds the Android APK on every push |

## Play in a browser

```bash
npm install
npm run serve
```

Then go to http://localhost:8765. On a phone, the 📲 button on the map installs it to the home screen (works offline).

## Android

**Get the APK:** every push to `main` builds one on GitHub and puts it on the [Candy Burst for Android release](https://github.com/fmsami/candy-burst/releases/tag/android). [This link](https://github.com/fmsami/candy-burst/releases/latest/download/candy-burst.apk) always downloads the newest build. On the phone, open the `.apk` and allow installing from that source when asked.

**Build it yourself:** install [Android Studio](https://developer.android.com/studio) (it includes the SDK and Java 21), then:

```bash
npm install
npm run sync          # bundles fonts, renders icons, copies www/ into the native projects
npx cap open android  # then press Run in Android Studio
```

**Google Play:** needs a Google Play developer account (one-time $25). Create an upload keystore in Android Studio (*Build → Generate Signed App Bundle*) and upload the `.aab`.

## iPhone / iPad

Building an iOS app needs a Mac with Xcode.

```bash
npm install
npm run sync
npx cap open ios
```

In Xcode, select the **App** target → *Signing & Capabilities* → choose your Apple ID as the team, plug in the iPhone and press Run. A free Apple ID installs it on your own phone for 7 days; the Apple Developer Program ($99/year) removes that limit and lets you publish on the App Store and TestFlight.

**No Mac?** Host `www/` on any HTTPS site (GitHub Pages, Netlify, Cloudflare Pages), open it in Safari on the iPhone, tap **Share → Add to Home Screen**. It runs full screen and offline like an app.

## After changing the game

Edit `www/index.html`, then run `npm run sync` so the Android and iOS projects get the new version. `npm run artifact` writes a single self-contained page to `dist/` for hosts that add their own page wrapper.

## Features

**Matching**
- Swap neighbouring candies by dragging or by tapping one then the other
- Six candy types, with cascades, gravity and refills (including diagonal sliding past blockers)
- Combo words for long cascades: Sweet, Tasty, Delicious, Divine

**Special candies**
| Make it by | You get | What it does |
|---|---|---|
| 4 in a row | Striped candy | Clears a full row or column |
| L or T shape | Wrapped candy | Explodes 3×3, falls, then explodes again |
| 5 in a row | Color Bomb | Clears every candy of the color it's swapped with |

**Special combos** (swap two specials together)
- Striped + Striped: row and column cross
- Striped + Wrapped: giant 3-wide cross
- Wrapped + Wrapped: 5×5 blast
- Color Bomb + Striped / Wrapped: turns every candy of that color into that special, then fires them all
- Color Bomb + Color Bomb: clears the whole board

**Blockers and goals**
- Jelly (1 or 2 layers), frosting (1 or 2 layers), licorice locks, spreading chocolate
- Ingredients (cherries and hazelnuts) to bring down to the exits
- Level goals: score target, clear jelly, break frosting, clear chocolate, collect colors, make specials, drop ingredients
- Limited moves, 1–3 star scoring, and a Sugar Crush finale that turns leftover moves into striped candies

**Meta game**
- 30 levels across three worlds on a winding level map, with saved stars and best scores
- Lives: 5 max, one back every 20 minutes, plus a free daily refill
- In-game boosters: Lollipop Hammer, Free Switch, Shuffle
- Pre-level boosters: Color Bomb, Striped + Wrapped, +3 Moves
- +5 Moves when you run out
- Daily Booster Wheel, and a booster reward for your first 3 stars on a level
- Hints after a few idle seconds and an automatic shuffle when no moves are left
- Synthesized sound effects (toggle with the speaker button)
- In the apps: haptic feedback on blasts and wins, Android back button support, portrait lock, sound pauses in the background

Progress is saved in the browser's local storage.

## Level format

Levels live in the `LEVELS` array in `www/index.html`. Each map is a list of strings:

| Char | Cell |
|---|---|
| `.` | normal candy |
| `#` | no cell |
| `j` / `J` | jelly, 1 / 2 layers |
| `i` / `I` | frosting, 1 / 2 layers |
| `l` | licorice-locked candy |
| `c` | chocolate |

---

Made by Fahim Muntasir Sami.
