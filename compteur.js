/* compteur de passages, invisible : une ligne par page vue, sans cookie, sans adresse IP, sans identifiant.
   Bertrand ne se compte pas : la page visites.html, ou bertrandbasset.com/?moi, l'exclut sur l'appareil utilisé. */
(function(){try{
  var l=location; if(/^(localhost|127\.)/.test(l.hostname)) return;
  if(/[?&]moi\b/.test(l.search)) localStorage.setItem('bb-moi','1');
  if(/[?&]compte-moi\b/.test(l.search)) localStorage.removeItem('bb-moi');
  if(localStorage.getItem('bb-moi')) return;
  var r=''; try{ r=document.referrer?new URL(document.referrer).hostname:'' }catch(e){}
  var d=JSON.stringify({p:l.pathname,r:r,e:innerWidth<760?'mobile':'ordinateur'});
  var u='https://suecslynruuputmujudg.supabase.co/functions/v1/visite';
  if(navigator.sendBeacon) navigator.sendBeacon(u,d); else fetch(u,{method:'POST',body:d,keepalive:true});
}catch(e){}})();
