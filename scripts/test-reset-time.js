// Runs the reset-time formatters from an installed webview/index.js on sample times.
// Usage: node test-reset-time.js <path to webview/index.js>
const t = require('fs').readFileSync(process.argv[2], 'utf8');
const gsSrc = t.match(/function gS\(\$\)\{let J=Date\.now\(\).*?`in \$\{Math\.floor\(Y\/24\)\}d`\}/);
const iSrc = t.match(/function I35\(\$\)\{try\{.*?catch\{return""\}\}/);
if (!gsSrc || !iSrc) { console.error('Could not find the formatters (different version?)'); process.exit(1); }
const gS = eval('(' + gsSrc[0] + ')'), I35 = eval('(' + iSrc[0] + ')');
const now = Date.now();
for (const [label, min] of [['57m', 57], ['1h 59m', 119], ['1h 30m', 90], ['23h 59m', 1439], ['1d 23h', 2820], ['3d', 4320]]) {
  const ms = now + min * 60000 + 500;
  console.log(`${label.padEnd(8)} -> ${gS(ms / 1000).padEnd(14)} ${I35(new Date(ms).toISOString())}`);
}
