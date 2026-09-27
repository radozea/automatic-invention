# Claude Code VS Code time-rounding patch

The Claude Code VS Code extension shows times like "1h 59m" as "1h" (hours are floored and minutes dropped).

- `extension-files/`: upload the extension's JS files here for inspection.
- `scripts/find.js`: `node scripts/find.js <extension folder>` writes `matches.txt` with the code around likely time-formatting spots. Read-only.
- `scripts/fix.js`: `node scripts/fix.js <extension folder>` patches the `mostSignificantOnly` hour branch to show "1h 59m". Backs up each changed file to `.bak`.
