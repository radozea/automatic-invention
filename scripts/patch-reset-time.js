// Fixes "resets in 1h" when the real time left is 1h 59m (Claude Code VS Code extension 2.1.280).
// Usage: node patch-reset-time.js <path to webview/index.js>
// Backs up the original to index.js.bak. Refuses to write if any snippet isn't found exactly once.
const fs = require('fs');
const file = process.argv[2];
if (!file) { console.error('Usage: node patch-reset-time.js <path to webview/index.js>'); process.exit(1); }

const edits = [
  { // gS(): usage-limit banner "· resets in 1h" and the usage bars
    find: 'let Y=Math.floor(X/60);if(Y<24)return`in ${Y}h`;return`in ${Math.floor(Y/24)}d`}',
    repl: 'let Y=Math.floor(X/60);if(Y<24)return X%60?`in ${Y}h ${X%60}m`:`in ${Y}h`;return Y%24?`in ${Math.floor(Y/24)}d ${Y%24}h`:`in ${Math.floor(Y/24)}d`}',
  },
  { // I35(): account/usage panel bars
    find: 'if(Y<60)return`in ${Y}m`;else if(Q<24)return`in ${Q}h`;else return`in ${z}d`}',
    repl: 'if(Y<60)return`in ${Y}m`;else if(Q<24)return Y%60?`in ${Q}h ${Y%60}m`:`in ${Q}h`;else return Q%24?`in ${z}d ${Q%24}h`:`in ${z}d`}',
  },
];

let src = fs.readFileSync(file, 'utf8');
for (const e of edits) {
  const n = src.split(e.find).length - 1;
  if (n !== 1) {
    const already = src.includes(e.repl);
    console.error(already ? 'Already patched: ' + e.find.slice(0, 40) + '...'
                          : `Expected 1 match, found ${n}: ` + e.find.slice(0, 40) + '... (different extension version?)');
    process.exit(1);
  }
}
fs.copyFileSync(file, file + '.bak');
for (const e of edits) src = src.replace(e.find, e.repl);
fs.writeFileSync(file, src);
console.log('Patched ' + file + ' (backup: ' + file + '.bak)');
