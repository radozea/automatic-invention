# Usage limit reset time drops minutes ("1h 59m" shows as "resets in 1h")

**Where:** Claude Code VS Code extension 2.1.280, usage-limit banner and usage bars.

**What happens:** The reset countdown floors to the largest unit and drops the rest.

| Time left | Shown | Expected |
|---|---|---|
| 1h 59m | in 1h | in 1h 59m |
| 1h 30m | in 1h | in 1h 30m |
| 23h 59m | in 23h | in 23h 59m |
| 1d 23h | in 1d | in 1d 23h |

At 1h 59m the display says "1h", which reads as roughly half the real wait.

**Cause:** Two formatters in `webview/index.js` (minified names from 2.1.280):

- `gS(resetsAtSeconds)`, used by the rate-limit banner (`· resets ${gS(...)}`) and the usage bars:
  `let Y=Math.floor(X/60);if(Y<24)return\`in ${Y}h\`;return\`in ${Math.floor(Y/24)}d\``
- `I35(resetsAtIso)`, used by the account/usage panel bars:
  `else if(Q<24)return\`in ${Q}h\`;else return\`in ${z}d\``

Both compute whole hours/days with `Math.floor` and discard the remainder.

**Suggested fix:** Include the next unit down, e.g. `in 1h 59m` and `in 1d 23h`. The terminal CLI already has a formatter that does this (`Xh Ym`).
