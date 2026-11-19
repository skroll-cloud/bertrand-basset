/* un clic sur un film charge la vidéo dans le lecteur de la page, sans quitter le site */
(function(){
var cadre=document.getElementById('ecran'); if(!cadre) return;
var f=cadre.querySelector('iframe'), liens=[].slice.call(document.querySelectorAll('a[data-vimeo]'));
function adresse(a){return 'https://player.vimeo.com/video/'+a.dataset.vimeo+'?dnt=1&autoplay=1'+(a.dataset.h?'&h='+a.dataset.h:'')}
liens.forEach(function(a){
  if(f.src.indexOf('/video/'+a.dataset.vimeo)>-1) a.classList.add('en-cours');
  a.addEventListener('click',function(e){
    e.preventDefault(); cadre.hidden=false; f.src=adresse(a); f.title=a.dataset.titre||'';
    liens.forEach(function(x){x.classList.toggle('en-cours',x===a)});
    cadre.scrollIntoView({behavior:'smooth',block:'start'});
  });
});
})();
