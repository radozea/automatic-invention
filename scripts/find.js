// Usage: node find.js <extension folder>   -> writes matches.txt next to this script
const fs=require('fs'),path=require('path');
const pats=[/mostSignificantOnly/g,/3600000|36e5/g,/resetsAt/g,/[Rr]esets? in/g,/\}h`/g];
const out=[];
function walk(d){for(const f of fs.readdirSync(d)){const p=path.join(d,f),s=fs.statSync(p);
 if(s.isDirectory()){if(f!=='node_modules')walk(p);}
 else if(/\.(js|cjs|mjs)$/.test(f)){const t=fs.readFileSync(p,'utf8');
  for(const re of pats){re.lastIndex=0;let m,n=0;
   while((m=re.exec(t))&&n<15){n++;
    out.push(`### ${path.relative(process.argv[2],p)} @${m.index} [${re.source}]\n`+t.slice(Math.max(0,m.index-250),m.index+250)+'\n');}}}}}
walk(process.argv[2]);
fs.writeFileSync(path.join(__dirname,'matches.txt'),out.join('\n'));
console.log(out.length+' matches written to matches.txt');
