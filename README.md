# Candy Burst

A match-3 candy game that runs in the browser. One HTML file, no build step, no dependencies.

## Play

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8765
```

Then go to http://localhost:8765.

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

Progress is saved in the browser's local storage.

## Level format

Levels live in the `LEVELS` array in `index.html`. Each map is a list of strings:

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
