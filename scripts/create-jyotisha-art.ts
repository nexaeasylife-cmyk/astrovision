import { writeFileSync } from 'node:fs';
import { rashis, nakshatras, grahas } from '../src/data/jyotisha';
const point = (r: number, a: number) => [500 + r * Math.cos(a), 500 - r * Math.sin(a)];
const ring = (r: number) => `<circle cx="500" cy="500" r="${r}" fill="none" stroke="#d6ab5b" stroke-width="1.5"/>`;
const line = (a: number, inner: number, outer: number, opacity = 1) => { const p=point(inner,a),q=point(outer,a);return `<path d="M${p.join(' ')}L${q.join(' ')}" stroke="#d6ab5b" opacity="${opacity}"/>`; };
const label = (text: string, r: number, a: number, size: number) => { const [x,y]=point(r,a);return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" fill="#e6c888" font-family="Georgia,serif" font-size="${size}">${text}</text>`; };
let artwork = [ring(285),ring(365),ring(380),ring(456),ring(470)].join('');
rashis.forEach((name,i)=>{const a=Math.PI/2+i*Math.PI*2/12;artwork+=line(a,285,365)+label(name,327,a+Math.PI/12,17);});
nakshatras.forEach((name,i)=>{const a=Math.PI/2+i*Math.PI*2/27;artwork+=line(a,380,456)+label(name,417,a+Math.PI/27,name.length>14?8.2:9.5);});
for(let i=0;i<108;i++) artwork+=line(Math.PI/2+i*Math.PI*2/108,460,i%4===0?477:467,.7);
const svg=(body: string)=>`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1000 1000">${body}</svg>`;
writeFileSync('public/images/jyotisha-rings.svg',svg(artwork));
let centre=ring(230)+ring(104);
for(let i=0;i<24;i++){const a=i*15;centre+=`<path d="M500 423 Q477 396 500 365 Q523 396 500 423Z" fill="#c69843" fill-opacity=".25" stroke="#e2b764" transform="rotate(${a} 500 500)"/>`;}
centre+='<defs><radialGradient id="sun"><stop stop-color="#fff1bc"/><stop offset=".55" stop-color="#e7b35b"/><stop offset="1" stop-color="#a66520"/></radialGradient></defs><circle cx="500" cy="500" r="63" fill="url(#sun)"/><text x="500" y="505" fill="#704316" font-size="19" font-family="Georgia,serif" text-anchor="middle">SURYA</text>';
grahas.forEach((g,i)=>{const a=Math.PI/6+i*Math.PI/3;const [x,y]=point(230,a);centre+=`<circle cx="${x}" cy="${y}" r="${g.size*125}" fill="${g.color}"/>`;});
[0,Math.PI].forEach((a,i)=>{const [x,y]=point(258,a);centre+=`<circle cx="${x}" cy="${y}" r="13" fill="none" stroke="${i===0?'#e2cb91':'#bc955f'}" stroke-width="3"/>`;});
writeFileSync('public/images/jyotisha-poster.svg',svg(artwork+centre));
console.log('Generated 12 rashi sectors, 27 nakshatra sectors and 108 quarter markers.');
