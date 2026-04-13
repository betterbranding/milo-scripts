function fixNav(){
  document.querySelectorAll('a').forEach(function(a){
    var t=a.textContent.trim();
    if(t==='Home') a.href='/home';
    if(t.indexOf('MILEX')>-1) a.href='/milex';
    if(t==='Homeowners') a.href='/homeowners';
    if(t.indexOf('Builders')>-1) a.href='/builders';
  });
}
fixNav();
setInterval(fixNav,500);
