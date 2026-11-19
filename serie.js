/* lecteur de série : une image à la fois, flèches, clic sur l'image, audio si l'entretien existe */
(function(){
var D=JSON.parse(document.getElementById('serie-data').textContent),i=0,mode='un';
var st=document.getElementById('stage'),img=document.getElementById('img'),cap=document.getElementById('cap'),cnt=document.getElementById('cnt'),
au=document.getElementById('audio'),aw=document.getElementById('audiowrap'),an=document.getElementById('audionone'),mo=document.getElementById('mosaic'),un=document.getElementById('un');
D.forEach(function(d,k){var m=document.createElement('img');m.src=d.src;m.alt=d.cap;m.loading='lazy';m.onclick=function(){i=k;set('un');st.scrollIntoView({block:'start'})};mo.appendChild(m)});
function legende(t){cap.textContent='';var p=t.split(' · ');cap.appendChild(document.createTextNode(p[0]));if(p.length>1){var g=document.createElement('span');g.className='g';g.textContent=' '+p.slice(1).join(' · ');cap.appendChild(g)}}
var jeton=0;
function show(){var d=D[i],j=++jeton;img.style.opacity=0;var n=new Image();n.onload=function(){if(j!==jeton)return;img.src=d.src;img.alt=d.cap;img.style.opacity=1};n.src=d.src;
 legende(d.cap);cnt.textContent=(i+1)+' / '+D.length;
 if(aw){au.pause();if(d.audio){au.src=d.audio;aw.hidden=false;an.hidden=true}else{aw.hidden=true;an.hidden=false}}}
function set(m){mode=m;un.hidden=m!=='un';mo.hidden=m!=='mo';show()}
function pas(k){i=(i+k+D.length)%D.length;show()}
document.getElementById('prev').onclick=function(){pas(-1)};
document.getElementById('next').onclick=function(){pas(1)};
img.onclick=function(){if(D.length>1)pas(1)};
addEventListener('keydown',function(e){if(mode!=='un')return;if(e.key==='ArrowRight')pas(1);if(e.key==='ArrowLeft')pas(-1)});
if(D.length<2){document.getElementById('prev').hidden=document.getElementById('next').hidden=true}
set('un');
})();
