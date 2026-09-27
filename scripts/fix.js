const fs=require('fs'),path=require('path');
const re=/(mostSignificantOnly\)\{if\(([\w$]+)>0\)return`\$\{\2\}d`;if\(([\w$]+)>0\)return)`\$\{\3\}h`(;if\(([\w$]+)>0\)return`\$\{\5\}m`)/g;
function walk(d){for(const f of fs.readdirSync(d)){const p=path.join(d,f),s=fs.statSync(p);
 if(s.isDirectory())walk(p);else if(p.endsWith('.js')){const t=fs.readFileSync(p,'utf8');
  const n=t.replace(re,(m,a,d,h,b,mi)=>`${a}(${mi}>0?\`\${${h}}h \${${mi}}m\`:\`\${${h}}h\`)${b}`);
  if(n!==t){fs.copyFileSync(p,p+'.bak');fs.writeFileSync(p,n);console.log('patched',p);}}}}
walk(process.argv[2]);
