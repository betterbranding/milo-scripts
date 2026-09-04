# MILO V3 GHL deploy codes (fast-loader v5)

Location baked into loaders: `tulia`. Domain: `go.miloinsulation.com`.

Per page, two placements in GHL:
1. **Body**: add a blank section, Add Element > Custom HTML/JS, paste the loader, Save, then Save page + Publish.
2. **Page Settings > Tracking Code > Header**: replace ALL existing content with the meta block (this removes the old navfix script tags on purpose), Save, Publish.

Never put the loader in the header tracking code.

---

## /home

### Body Custom HTML/JS element

```html
<script>
/* MILO INSULATION loader v5 (body element) | Home | location: tulia */
(function () {
  var GH = 'https://betterbranding.github.io/milo-scripts';
  var LOC = 'tulia';
  try {
    var st = document.createElement('style');
    st.id = 'fastSplash';
    st.textContent = 'html{background:#FFFFFF!important}body>*{visibility:hidden!important}' +
      'html::before{content:\"\";position:fixed;inset:0;z-index:2147483646;background-color:#FFFFFF;' +
      'background-image:url(https://betterbranding.github.io/milo-scripts/v3-preview/assets/logo.png);background-repeat:no-repeat;' +
      'background-position:center calc(50% - 26px);background-size:min(240px,62vw) auto}' +
      'html::after{content:\"\";position:fixed;top:calc(50% + 30px);left:50%;width:28px;height:28px;margin-left:-14px;' +
      'border-radius:50%;border:3px solid rgba(40,141,17,.18);border-top-color:#FF8200;' +
      'animation:fastspin .8s linear infinite;z-index:2147483647}' +
      '@keyframes fastspin{to{transform:rotate(360deg)}}' +
      '@media (prefers-reduced-motion:reduce){html::after{animation:none}}';
    (document.head || document.documentElement).appendChild(st);
  } catch (e) {}
  fetch(GH + '/v3/pages/home.html?v=1').then(function (r) {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.text();
  }).then(function (html) {
    html = html.replace('__MILO_LOCATION__', LOC);
    document.open();
    document.write(html);
    document.close();
  }).catch(function (e) {
    var s = document.getElementById('fastSplash');
    if (s && s.parentNode) s.parentNode.removeChild(s);
  });
})();
</script>
```

### Header tracking code (meta only)

```html
<!-- ===== MILO INSULATION | MILO INSULATION | Nature's Very Best | SEO (meta only, no scripts, no styles) ===== -->
<link rel="canonical" href="https://go.miloinsulation.com/home">
<meta name="description" content="MILEX Thermal MAX is all-natural attic insulation crafted exclusively from grain sorghum. Maximize comfort, save money, and schedule your free Home Efficiency Scan.">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<meta property="og:title" content="MILO INSULATION | Nature&#x27;s Very Best | MILO INSULATION">
<meta property="og:description" content="MILEX Thermal MAX is all-natural attic insulation crafted exclusively from grain sorghum. Maximize comfort, save money, and schedule your free Home Efficiency Scan.">
<meta property="og:image" content="https://betterbranding.github.io/milo-scripts/v3-preview/assets/header-home.jpg">
<meta property="og:url" content="https://go.miloinsulation.com/home">
<meta property="og:type" content="website">
<meta property="og:site_name" content="MILO INSULATION">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="MILO INSULATION | Nature&#x27;s Very Best | MILO INSULATION">
<meta name="twitter:description" content="MILEX Thermal MAX is all-natural attic insulation crafted exclusively from grain sorghum. Maximize comfort, save money, and schedule your free Home Efficiency Scan.">
<meta name="twitter:image" content="https://betterbranding.github.io/milo-scripts/v3-preview/assets/header-home.jpg">
<meta name="theme-color" content="#288D11">
<link rel="icon" type="image/png" href="https://betterbranding.github.io/milo-scripts/v3-preview/assets/icon.png">
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://go.miloinsulation.com/#organization","name":"MILO Insulation","url":"https://go.miloinsulation.com/","logo":{"@type":"ImageObject","url":"https://betterbranding.github.io/milo-scripts/v3-preview/assets/icon.png","width":1024,"height":1024},"slogan":"Nature's Very Best"},{"@type":"WebSite","@id":"https://go.miloinsulation.com/#website","url":"https://go.miloinsulation.com/","name":"MILO Insulation","publisher":{"@id":"https://go.miloinsulation.com/#organization"},"inLanguage":"en-US"},{"@type":"WebPage","@id":"https://go.miloinsulation.com/home#webpage","url":"https://go.miloinsulation.com/home","name":"MILO INSULATION | Nature's Very Best | MILO Insulation","description":"MILEX Thermal MAX is all-natural attic insulation crafted exclusively from grain sorghum. Maximize comfort, save money, and schedule your free Home Efficiency Scan.","isPartOf":{"@id":"https://go.miloinsulation.com/#website"},"inLanguage":"en-US","primaryImageOfPage":{"@type":"ImageObject","url":"https://betterbranding.github.io/milo-scripts/v3-preview/assets/header-home.jpg"},"breadcrumb":{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://go.miloinsulation.com/home"}]}}]}</script>
<!-- ===== /MILO INSULATION MILO INSULATION | Nature's Very Best ===== -->
```

---

## /milex

### Body Custom HTML/JS element

```html
<script>
/* MILO INSULATION loader v5 (body element) | Milex | location: tulia */
(function () {
  var GH = 'https://betterbranding.github.io/milo-scripts';
  var LOC = 'tulia';
  try {
    var st = document.createElement('style');
    st.id = 'fastSplash';
    st.textContent = 'html{background:#FFFFFF!important}body>*{visibility:hidden!important}' +
      'html::before{content:\"\";position:fixed;inset:0;z-index:2147483646;background-color:#FFFFFF;' +
      'background-image:url(https://betterbranding.github.io/milo-scripts/v3-preview/assets/logo.png);background-repeat:no-repeat;' +
      'background-position:center calc(50% - 26px);background-size:min(240px,62vw) auto}' +
      'html::after{content:\"\";position:fixed;top:calc(50% + 30px);left:50%;width:28px;height:28px;margin-left:-14px;' +
      'border-radius:50%;border:3px solid rgba(40,141,17,.18);border-top-color:#FF8200;' +
      'animation:fastspin .8s linear infinite;z-index:2147483647}' +
      '@keyframes fastspin{to{transform:rotate(360deg)}}' +
      '@media (prefers-reduced-motion:reduce){html::after{animation:none}}';
    (document.head || document.documentElement).appendChild(st);
  } catch (e) {}
  fetch(GH + '/v3/pages/milex.html?v=1').then(function (r) {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.text();
  }).then(function (html) {
    html = html.replace('__MILO_LOCATION__', LOC);
    document.open();
    document.write(html);
    document.close();
  }).catch(function (e) {
    var s = document.getElementById('fastSplash');
    if (s && s.parentNode) s.parentNode.removeChild(s);
  });
})();
</script>
```

### Header tracking code (meta only)

```html
<!-- ===== MILO INSULATION | MILEX Thermal MAX Natural Insulation | SEO (meta only, no scripts, no styles) ===== -->
<link rel="canonical" href="https://go.miloinsulation.com/milex">
<meta name="description" content="MILEX Thermal MAX: patented, all-natural Thermal Puff insulation grown from grain sorghum. Non-toxic, non-irritant, virtually dust-free, and backed by a lifetime warranty.">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<meta property="og:title" content="MILEX Thermal MAX Natural Insulation | MILO INSULATION">
<meta property="og:description" content="MILEX Thermal MAX: patented, all-natural Thermal Puff insulation grown from grain sorghum. Non-toxic, non-irritant, virtually dust-free, and backed by a lifetime warranty.">
<meta property="og:image" content="https://betterbranding.github.io/milo-scripts/v3-preview/assets/hero-milex-award.jpg">
<meta property="og:url" content="https://go.miloinsulation.com/milex">
<meta property="og:type" content="website">
<meta property="og:site_name" content="MILO INSULATION">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="MILEX Thermal MAX Natural Insulation | MILO INSULATION">
<meta name="twitter:description" content="MILEX Thermal MAX: patented, all-natural Thermal Puff insulation grown from grain sorghum. Non-toxic, non-irritant, virtually dust-free, and backed by a lifetime warranty.">
<meta name="twitter:image" content="https://betterbranding.github.io/milo-scripts/v3-preview/assets/hero-milex-award.jpg">
<meta name="theme-color" content="#288D11">
<link rel="icon" type="image/png" href="https://betterbranding.github.io/milo-scripts/v3-preview/assets/icon.png">
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://go.miloinsulation.com/#organization","name":"MILO Insulation","url":"https://go.miloinsulation.com/","logo":{"@type":"ImageObject","url":"https://betterbranding.github.io/milo-scripts/v3-preview/assets/icon.png","width":1024,"height":1024},"slogan":"Nature's Very Best"},{"@type":"WebSite","@id":"https://go.miloinsulation.com/#website","url":"https://go.miloinsulation.com/","name":"MILO Insulation","publisher":{"@id":"https://go.miloinsulation.com/#organization"},"inLanguage":"en-US"},{"@type":"WebPage","@id":"https://go.miloinsulation.com/milex#webpage","url":"https://go.miloinsulation.com/milex","name":"MILEX Thermal MAX Natural Insulation | MILO Insulation","description":"MILEX Thermal MAX: patented, all-natural Thermal Puff insulation grown from grain sorghum. Non-toxic, non-irritant, virtually dust-free, and backed by a lifetime warranty.","isPartOf":{"@id":"https://go.miloinsulation.com/#website"},"inLanguage":"en-US","primaryImageOfPage":{"@type":"ImageObject","url":"https://betterbranding.github.io/milo-scripts/v3-preview/assets/hero-milex-award.jpg"},"breadcrumb":{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://go.miloinsulation.com/home"},{"@type":"ListItem","position":2,"name":"MILEX Thermal MAX Natural Insulation","item":"https://go.miloinsulation.com/milex"}]}},{"@type":"Product","@id":"https://go.miloinsulation.com/milex#product","name":"MILEX Thermal MAX","brand":{"@type":"Brand","name":"MILO Insulation"},"description":"All-natural attic insulation crafted exclusively from grain sorghum.","image":"https://betterbranding.github.io/milo-scripts/v3-preview/assets/hero-milex-award.jpg","url":"https://go.miloinsulation.com/milex"}]}</script>
<!-- ===== /MILO INSULATION MILEX Thermal MAX Natural Insulation ===== -->
```

---

## /science

### Body Custom HTML/JS element

```html
<script>
/* MILO INSULATION loader v5 (body element) | Science | location: tulia */
(function () {
  var GH = 'https://betterbranding.github.io/milo-scripts';
  var LOC = 'tulia';
  try {
    var st = document.createElement('style');
    st.id = 'fastSplash';
    st.textContent = 'html{background:#FFFFFF!important}body>*{visibility:hidden!important}' +
      'html::before{content:\"\";position:fixed;inset:0;z-index:2147483646;background-color:#FFFFFF;' +
      'background-image:url(https://betterbranding.github.io/milo-scripts/v3-preview/assets/logo.png);background-repeat:no-repeat;' +
      'background-position:center calc(50% - 26px);background-size:min(240px,62vw) auto}' +
      'html::after{content:\"\";position:fixed;top:calc(50% + 30px);left:50%;width:28px;height:28px;margin-left:-14px;' +
      'border-radius:50%;border:3px solid rgba(40,141,17,.18);border-top-color:#FF8200;' +
      'animation:fastspin .8s linear infinite;z-index:2147483647}' +
      '@keyframes fastspin{to{transform:rotate(360deg)}}' +
      '@media (prefers-reduced-motion:reduce){html::after{animation:none}}';
    (document.head || document.documentElement).appendChild(st);
  } catch (e) {}
  fetch(GH + '/v3/pages/science.html?v=1').then(function (r) {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.text();
  }).then(function (html) {
    html = html.replace('__MILO_LOCATION__', LOC);
    document.open();
    document.write(html);
    document.close();
  }).catch(function (e) {
    var s = document.getElementById('fastSplash');
    if (s && s.parentNode) s.parentNode.removeChild(s);
  });
})();
</script>
```

### Header tracking code (meta only)

```html
<!-- ===== MILO INSULATION | The Science Behind MILEX Thermal MAX | SEO (meta only, no scripts, no styles) ===== -->
<link rel="canonical" href="https://go.miloinsulation.com/science">
<meta name="description" content="Physics, not chemicals. See how MILEX Thermal Puffs trap air, resist heat transfer, and outperform traditional insulation in real Texas and Oklahoma attics.">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<meta property="og:title" content="The Science Behind MILEX Thermal MAX | MILO INSULATION">
<meta property="og:description" content="Physics, not chemicals. See how MILEX Thermal Puffs trap air, resist heat transfer, and outperform traditional insulation in real Texas and Oklahoma attics.">
<meta property="og:image" content="https://betterbranding.github.io/milo-scripts/v3-preview/assets/hero-science-puff.jpg">
<meta property="og:url" content="https://go.miloinsulation.com/science">
<meta property="og:type" content="website">
<meta property="og:site_name" content="MILO INSULATION">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="The Science Behind MILEX Thermal MAX | MILO INSULATION">
<meta name="twitter:description" content="Physics, not chemicals. See how MILEX Thermal Puffs trap air, resist heat transfer, and outperform traditional insulation in real Texas and Oklahoma attics.">
<meta name="twitter:image" content="https://betterbranding.github.io/milo-scripts/v3-preview/assets/hero-science-puff.jpg">
<meta name="theme-color" content="#288D11">
<link rel="icon" type="image/png" href="https://betterbranding.github.io/milo-scripts/v3-preview/assets/icon.png">
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://go.miloinsulation.com/#organization","name":"MILO Insulation","url":"https://go.miloinsulation.com/","logo":{"@type":"ImageObject","url":"https://betterbranding.github.io/milo-scripts/v3-preview/assets/icon.png","width":1024,"height":1024},"slogan":"Nature's Very Best"},{"@type":"WebSite","@id":"https://go.miloinsulation.com/#website","url":"https://go.miloinsulation.com/","name":"MILO Insulation","publisher":{"@id":"https://go.miloinsulation.com/#organization"},"inLanguage":"en-US"},{"@type":"WebPage","@id":"https://go.miloinsulation.com/science#webpage","url":"https://go.miloinsulation.com/science","name":"The Science Behind MILEX Thermal MAX | MILO Insulation","description":"Physics, not chemicals. See how MILEX Thermal Puffs trap air, resist heat transfer, and outperform traditional insulation in real Texas and Oklahoma attics.","isPartOf":{"@id":"https://go.miloinsulation.com/#website"},"inLanguage":"en-US","primaryImageOfPage":{"@type":"ImageObject","url":"https://betterbranding.github.io/milo-scripts/v3-preview/assets/hero-science-puff.jpg"},"breadcrumb":{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://go.miloinsulation.com/home"},{"@type":"ListItem","position":2,"name":"The Science Behind MILEX Thermal MAX","item":"https://go.miloinsulation.com/science"}]}},{"@type":"Product","@id":"https://go.miloinsulation.com/milex#product","name":"MILEX Thermal MAX","brand":{"@type":"Brand","name":"MILO Insulation"},"description":"All-natural attic insulation crafted exclusively from grain sorghum.","image":"https://betterbranding.github.io/milo-scripts/v3-preview/assets/hero-milex-award.jpg","url":"https://go.miloinsulation.com/milex"}]}</script>
<!-- ===== /MILO INSULATION The Science Behind MILEX Thermal MAX ===== -->
```

---

## /homeowners

### Body Custom HTML/JS element

```html
<script>
/* MILO INSULATION loader v5 (body element) | Homeowners | location: tulia */
(function () {
  var GH = 'https://betterbranding.github.io/milo-scripts';
  var LOC = 'tulia';
  try {
    var st = document.createElement('style');
    st.id = 'fastSplash';
    st.textContent = 'html{background:#FFFFFF!important}body>*{visibility:hidden!important}' +
      'html::before{content:\"\";position:fixed;inset:0;z-index:2147483646;background-color:#FFFFFF;' +
      'background-image:url(https://betterbranding.github.io/milo-scripts/v3-preview/assets/logo.png);background-repeat:no-repeat;' +
      'background-position:center calc(50% - 26px);background-size:min(240px,62vw) auto}' +
      'html::after{content:\"\";position:fixed;top:calc(50% + 30px);left:50%;width:28px;height:28px;margin-left:-14px;' +
      'border-radius:50%;border:3px solid rgba(40,141,17,.18);border-top-color:#FF8200;' +
      'animation:fastspin .8s linear infinite;z-index:2147483647}' +
      '@keyframes fastspin{to{transform:rotate(360deg)}}' +
      '@media (prefers-reduced-motion:reduce){html::after{animation:none}}';
    (document.head || document.documentElement).appendChild(st);
  } catch (e) {}
  fetch(GH + '/v3/pages/homeowners.html?v=1').then(function (r) {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.text();
  }).then(function (html) {
    html = html.replace('__MILO_LOCATION__', LOC);
    document.open();
    document.write(html);
    document.close();
  }).catch(function (e) {
    var s = document.getElementById('fastSplash');
    if (s && s.parentNode) s.parentNode.removeChild(s);
  });
})();
</script>
```

### Header tracking code (meta only)

```html
<!-- ===== MILO INSULATION | Insulation for Homeowners | Free Home Efficiency Scan | SEO (meta only, no scripts, no styles) ===== -->
<link rel="canonical" href="https://go.miloinsulation.com/homeowners">
<meta name="description" content="Your family&#x27;s comfort depends on it. MILO INSULATION delivers all-natural attic insulation with a free Home Efficiency Scan ($399 value) and a lifetime warranty.">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<meta property="og:title" content="Insulation for Homeowners | Free Home Efficiency Scan | MILO INSULATION">
<meta property="og:description" content="Your family&#x27;s comfort depends on it. MILO INSULATION delivers all-natural attic insulation with a free Home Efficiency Scan ($399 value) and a lifetime warranty.">
<meta property="og:image" content="https://betterbranding.github.io/milo-scripts/v3-preview/assets/header-homeowners-new.jpg">
<meta property="og:url" content="https://go.miloinsulation.com/homeowners">
<meta property="og:type" content="website">
<meta property="og:site_name" content="MILO INSULATION">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Insulation for Homeowners | Free Home Efficiency Scan | MILO INSULATION">
<meta name="twitter:description" content="Your family&#x27;s comfort depends on it. MILO INSULATION delivers all-natural attic insulation with a free Home Efficiency Scan ($399 value) and a lifetime warranty.">
<meta name="twitter:image" content="https://betterbranding.github.io/milo-scripts/v3-preview/assets/header-homeowners-new.jpg">
<meta name="theme-color" content="#288D11">
<link rel="icon" type="image/png" href="https://betterbranding.github.io/milo-scripts/v3-preview/assets/icon.png">
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://go.miloinsulation.com/#organization","name":"MILO Insulation","url":"https://go.miloinsulation.com/","logo":{"@type":"ImageObject","url":"https://betterbranding.github.io/milo-scripts/v3-preview/assets/icon.png","width":1024,"height":1024},"slogan":"Nature's Very Best"},{"@type":"WebSite","@id":"https://go.miloinsulation.com/#website","url":"https://go.miloinsulation.com/","name":"MILO Insulation","publisher":{"@id":"https://go.miloinsulation.com/#organization"},"inLanguage":"en-US"},{"@type":"WebPage","@id":"https://go.miloinsulation.com/homeowners#webpage","url":"https://go.miloinsulation.com/homeowners","name":"Insulation for Homeowners | Free Home Efficiency Scan | MILO Insulation","description":"Your family's comfort depends on it. MILO INSULATION delivers all-natural attic insulation with a free Home Efficiency Scan ($399 value) and a lifetime warranty.","isPartOf":{"@id":"https://go.miloinsulation.com/#website"},"inLanguage":"en-US","primaryImageOfPage":{"@type":"ImageObject","url":"https://betterbranding.github.io/milo-scripts/v3-preview/assets/header-homeowners-new.jpg"},"breadcrumb":{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://go.miloinsulation.com/home"},{"@type":"ListItem","position":2,"name":"Insulation for Homeowners | Free Home Efficiency Scan","item":"https://go.miloinsulation.com/homeowners"}]}}]}</script>
<!-- ===== /MILO INSULATION Insulation for Homeowners | Free Home Efficiency Scan ===== -->
```

---

## /builders

### Body Custom HTML/JS element

```html
<script>
/* MILO INSULATION loader v5 (body element) | Builders | location: tulia */
(function () {
  var GH = 'https://betterbranding.github.io/milo-scripts';
  var LOC = 'tulia';
  try {
    var st = document.createElement('style');
    st.id = 'fastSplash';
    st.textContent = 'html{background:#FFFFFF!important}body>*{visibility:hidden!important}' +
      'html::before{content:\"\";position:fixed;inset:0;z-index:2147483646;background-color:#FFFFFF;' +
      'background-image:url(https://betterbranding.github.io/milo-scripts/v3-preview/assets/logo.png);background-repeat:no-repeat;' +
      'background-position:center calc(50% - 26px);background-size:min(240px,62vw) auto}' +
      'html::after{content:\"\";position:fixed;top:calc(50% + 30px);left:50%;width:28px;height:28px;margin-left:-14px;' +
      'border-radius:50%;border:3px solid rgba(40,141,17,.18);border-top-color:#FF8200;' +
      'animation:fastspin .8s linear infinite;z-index:2147483647}' +
      '@keyframes fastspin{to{transform:rotate(360deg)}}' +
      '@media (prefers-reduced-motion:reduce){html::after{animation:none}}';
    (document.head || document.documentElement).appendChild(st);
  } catch (e) {}
  fetch(GH + '/v3/pages/builders.html?v=1').then(function (r) {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.text();
  }).then(function (html) {
    html = html.replace('__MILO_LOCATION__', LOC);
    document.open();
    document.write(html);
    document.close();
  }).catch(function (e) {
    var s = document.getElementById('fastSplash');
    if (s && s.parentNode) s.parentNode.removeChild(s);
  });
})();
</script>
```

### Header tracking code (meta only)

```html
<!-- ===== MILO INSULATION | Builders & Contractors | MILO INSULATION | SEO (meta only, no scripts, no styles) ===== -->
<link rel="canonical" href="https://go.miloinsulation.com/builders">
<meta name="description" content="Give your builds a natural edge. MILO INSULATION partners with builders and contractors on MILEX Thermal MAX attic insulation. Request the builder info packet.">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<meta property="og:title" content="Builders &amp; Contractors | MILO INSULATION | MILO INSULATION">
<meta property="og:description" content="Give your builds a natural edge. MILO INSULATION partners with builders and contractors on MILEX Thermal MAX attic insulation. Request the builder info packet.">
<meta property="og:image" content="https://betterbranding.github.io/milo-scripts/v3-preview/assets/header-builders.jpg">
<meta property="og:url" content="https://go.miloinsulation.com/builders">
<meta property="og:type" content="website">
<meta property="og:site_name" content="MILO INSULATION">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Builders &amp; Contractors | MILO INSULATION | MILO INSULATION">
<meta name="twitter:description" content="Give your builds a natural edge. MILO INSULATION partners with builders and contractors on MILEX Thermal MAX attic insulation. Request the builder info packet.">
<meta name="twitter:image" content="https://betterbranding.github.io/milo-scripts/v3-preview/assets/header-builders.jpg">
<meta name="theme-color" content="#288D11">
<link rel="icon" type="image/png" href="https://betterbranding.github.io/milo-scripts/v3-preview/assets/icon.png">
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://go.miloinsulation.com/#organization","name":"MILO Insulation","url":"https://go.miloinsulation.com/","logo":{"@type":"ImageObject","url":"https://betterbranding.github.io/milo-scripts/v3-preview/assets/icon.png","width":1024,"height":1024},"slogan":"Nature's Very Best"},{"@type":"WebSite","@id":"https://go.miloinsulation.com/#website","url":"https://go.miloinsulation.com/","name":"MILO Insulation","publisher":{"@id":"https://go.miloinsulation.com/#organization"},"inLanguage":"en-US"},{"@type":"WebPage","@id":"https://go.miloinsulation.com/builders#webpage","url":"https://go.miloinsulation.com/builders","name":"Builders & Contractors | MILO INSULATION | MILO Insulation","description":"Give your builds a natural edge. MILO INSULATION partners with builders and contractors on MILEX Thermal MAX attic insulation. Request the builder info packet.","isPartOf":{"@id":"https://go.miloinsulation.com/#website"},"inLanguage":"en-US","primaryImageOfPage":{"@type":"ImageObject","url":"https://betterbranding.github.io/milo-scripts/v3-preview/assets/header-builders.jpg"},"breadcrumb":{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://go.miloinsulation.com/home"},{"@type":"ListItem","position":2,"name":"Builders & Contractors | MILO INSULATION","item":"https://go.miloinsulation.com/builders"}]}}]}</script>
<!-- ===== /MILO INSULATION Builders & Contractors | MILO INSULATION ===== -->
```

---

## /free-inspection

### Body Custom HTML/JS element

```html
<script>
/* MILO INSULATION loader v5 (body element) | Free Inspection Form | location: tulia */
(function () {
  var GH = 'https://betterbranding.github.io/milo-scripts';
  var LOC = 'tulia';
  try {
    var st = document.createElement('style');
    st.id = 'fastSplash';
    st.textContent = 'html{background:#FFFFFF!important}body>*{visibility:hidden!important}' +
      'html::before{content:\"\";position:fixed;inset:0;z-index:2147483646;background-color:#FFFFFF;' +
      'background-image:url(https://betterbranding.github.io/milo-scripts/v3-preview/assets/logo.png);background-repeat:no-repeat;' +
      'background-position:center calc(50% - 26px);background-size:min(240px,62vw) auto}' +
      'html::after{content:\"\";position:fixed;top:calc(50% + 30px);left:50%;width:28px;height:28px;margin-left:-14px;' +
      'border-radius:50%;border:3px solid rgba(40,141,17,.18);border-top-color:#FF8200;' +
      'animation:fastspin .8s linear infinite;z-index:2147483647}' +
      '@keyframes fastspin{to{transform:rotate(360deg)}}' +
      '@media (prefers-reduced-motion:reduce){html::after{animation:none}}';
    (document.head || document.documentElement).appendChild(st);
  } catch (e) {}
  fetch(GH + '/v3/pages/form.html?v=1').then(function (r) {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.text();
  }).then(function (html) {
    html = html.replace('__MILO_LOCATION__', LOC);
    document.open();
    document.write(html);
    document.close();
  }).catch(function (e) {
    var s = document.getElementById('fastSplash');
    if (s && s.parentNode) s.parentNode.removeChild(s);
  });
})();
</script>
```

### Header tracking code (meta only)

```html
<!-- ===== MILO INSULATION | Free Home Efficiency Scan ($399 Value) | SEO (meta only, no scripts, no styles) ===== -->
<link rel="canonical" href="https://go.miloinsulation.com/free-inspection">
<meta name="description" content="See if your home qualifies for a free Home Efficiency Scan, a $399 value. Answer a few quick questions and a MILO INSULATION specialist will contact you. No obligation.">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<meta property="og:title" content="Free Home Efficiency Scan ($399 Value) | MILO INSULATION">
<meta property="og:description" content="See if your home qualifies for a free Home Efficiency Scan, a $399 value. Answer a few quick questions and a MILO INSULATION specialist will contact you. No obligation.">
<meta property="og:image" content="https://betterbranding.github.io/milo-scripts/v3-preview/assets/header-homeowners-new.jpg">
<meta property="og:url" content="https://go.miloinsulation.com/free-inspection">
<meta property="og:type" content="website">
<meta property="og:site_name" content="MILO INSULATION">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Free Home Efficiency Scan ($399 Value) | MILO INSULATION">
<meta name="twitter:description" content="See if your home qualifies for a free Home Efficiency Scan, a $399 value. Answer a few quick questions and a MILO INSULATION specialist will contact you. No obligation.">
<meta name="twitter:image" content="https://betterbranding.github.io/milo-scripts/v3-preview/assets/header-homeowners-new.jpg">
<meta name="theme-color" content="#288D11">
<link rel="icon" type="image/png" href="https://betterbranding.github.io/milo-scripts/v3-preview/assets/icon.png">
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://go.miloinsulation.com/#organization","name":"MILO Insulation","url":"https://go.miloinsulation.com/","logo":{"@type":"ImageObject","url":"https://betterbranding.github.io/milo-scripts/v3-preview/assets/icon.png","width":1024,"height":1024},"slogan":"Nature's Very Best"},{"@type":"WebSite","@id":"https://go.miloinsulation.com/#website","url":"https://go.miloinsulation.com/","name":"MILO Insulation","publisher":{"@id":"https://go.miloinsulation.com/#organization"},"inLanguage":"en-US"},{"@type":"WebPage","@id":"https://go.miloinsulation.com/free-inspection#webpage","url":"https://go.miloinsulation.com/free-inspection","name":"Free Home Efficiency Scan ($399 Value) | MILO Insulation","description":"See if your home qualifies for a free Home Efficiency Scan, a $399 value. Answer a few quick questions and a MILO INSULATION specialist will contact you. No obligation.","isPartOf":{"@id":"https://go.miloinsulation.com/#website"},"inLanguage":"en-US","primaryImageOfPage":{"@type":"ImageObject","url":"https://betterbranding.github.io/milo-scripts/v3-preview/assets/header-homeowners-new.jpg"},"breadcrumb":{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://go.miloinsulation.com/home"},{"@type":"ListItem","position":2,"name":"Free Home Efficiency Scan ($399 Value)","item":"https://go.miloinsulation.com/free-inspection"}]}}]}</script>
<!-- ===== /MILO INSULATION Free Home Efficiency Scan ($399 Value) ===== -->
```
