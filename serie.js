/* lecteur de série : une image à la fois, flèches, clic sur l'image, son quand l'entretien existe.
   Plusieurs lecteurs peuvent vivre sur une page ; dans une ligne dépliable, le lecteur ne charge qu'à l'ouverture. */
(function(){
var actif=null;
function monter(v){
  if(v.pas) return;
  var D=JSON.parse(v.querySelector('script[type="application/json"]').textContent),i=0,jeton=0;
  var img=v.querySelector('.img img'),cap=v.querySelector('.cap'),cnt=v.querySelector('.cnt'),son=v.querySelector('.son'),au=son&&son.querySelector('audio');
  function legende(t){cap.textContent='';var p=t.split(' \u00b7 ');cap.appendChild(document.createTextNode(p[0]));if(p.length>1){var g=document.createElement('span');g.className='g';g.textContent=' '+p.slice(1).join(' \u00b7 ');cap.appendChild(g)}}
  function show(){var d=D[i],j=++jeton;img.style.opacity=0;var n=new Image();n.onload=function(){if(j!==jeton)return;img.src=d.src;img.alt=d.cap;img.style.opacity=1};n.src=d.src;
    legende(d.cap);cnt.textContent=(i+1)+' / '+D.length;
    if(son){au.pause();if(d.audio){au.src=d.audio;son.hidden=false}else{au.removeAttribute('src');son.hidden=true}}}
  v.pas=function(k){actif=v;i=(i+k+D.length)%D.length;show()};
  v.querySelector('.prev').onclick=function(){v.pas(-1)};
  v.querySelector('.next').onclick=function(){v.pas(1)};
  img.onclick=function(){if(D.length>1)v.pas(1)};
  if(D.length<2){v.querySelector('.prev').hidden=v.querySelector('.next').hidden=true}
  show();
}
[].forEach.call(document.querySelectorAll('.visionneuse'),function(v){
  var d=v.closest('details');
  if(!d){monter(v);actif=actif||v;return}
  d.addEventListener('toggle',function(){
    var a=v.querySelector('audio');
    if(d.open){monter(v);actif=v;d.scrollIntoView({behavior:'smooth',block:'start'})}
    else{if(a)a.pause();if(actif===v)actif=null}
  });
  if(d.open){monter(v);actif=v}
});
addEventListener('keydown',function(e){
  if(!actif||/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))return;
  if(e.key==='ArrowRight')actif.pas(1);if(e.key==='ArrowLeft')actif.pas(-1);
});
})();
