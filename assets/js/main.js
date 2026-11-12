(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const get = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const set = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const root = document.documentElement;
  const apply = () => { root.dataset.theme = get('theme') || 'light'; root.dir = get('dir') || 'ltr'; };
  apply();
  const I = d => `<svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
  const ICON = {
    moon: I('<path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5a8.5 8.5 0 1 0 10.8 10.8z"/>'),
    sun: I('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    swap: I('<path d="M4 8h13M14 5l3 3-3 3"/><path d="M20 16H7M10 13l-3 3 3 3"/>'),
    menu: I('<path d="M4 7h16M4 12h16M4 17h16"/>'), close: I('<path d="M6 6l12 12M18 6L6 18"/>'),
    pin: I('<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
    phone: I('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>'),
    mail: I('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'), clock: I('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    ig: I('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8"/>'),
    fb: I('<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>'),
    yt: I('<rect x="2.5" y="6" width="19" height="12" rx="3.5"/><path d="M10 9.5l5 2.5-5 2.5z"/>'),
    wa: I('<path d="M3.5 20.5l1.2-4.2A8.5 8.5 0 1 1 8 19.3z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8a4 4 0 0 1-2-2l.8-1-1-2z"/>'),
    eye: I('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>')
  };
  const EMBLEM = '<svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="16" fill="#D81B60"/><path d="M32 10c5 7 5 14 0 22-5-8-5-15 0-22z" fill="#fff"/><path d="M14 22c8 1 14 5 18 12-8 1-15-3-18-12zM50 22c-8 1-14 5-18 12 8 1 15-3 18-12z" fill="#FFD0E0"/><path d="M18 46h28" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M15 41v10M49 41v10" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>';
  const logo = href => `<a class="logo" href="${href}" aria-label="Bloom Women's Fitness Center home">${EMBLEM}<span class="lt"><b>BLOOM</b><small>Women's Fitness Center</small></span></a>`;
  const labelToggles = () => {
    const t = $('#theme'), d = $('#dir'), dk = root.dataset.theme === 'dark';
    if (t) { t.innerHTML = dk ? ICON.sun : ICON.moon; t.setAttribute('aria-label', dk ? 'Switch to light mode' : 'Switch to dark mode'); }
    if (d) { d.innerHTML = ICON.swap; d.setAttribute('aria-label', root.dir === 'rtl' ? 'Switch to left-to-right' : 'Switch to right-to-left'); }
  };
  const bindToggles = () => {
    const t = $('#theme'), d = $('#dir');
    if (t) t.onclick = () => { set('theme', root.dataset.theme === 'dark' ? 'light' : 'dark'); apply(); labelToggles(); document.dispatchEvent(new Event('bloom:change')); };
    if (d) d.onclick = () => { set('dir', root.dir === 'rtl' ? 'ltr' : 'rtl'); apply(); labelToggles(); document.dispatchEvent(new Event('bloom:change')); };
    labelToggles();
  };
  const valid = { email: v => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v), phone: v => /^[0-9+\s-]{8,15}$/.test(v) };
  window.BLOOM = { $, $$, get, set, I, ICON, EMBLEM, logo, bindToggles, valid };
  document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page, layout = document.body.dataset.layout || 'site';
    const tg = '<button class="icon-btn" id="theme" title="Light / dark"></button><button class="icon-btn" id="dir" title="Text direction"></button>';
    if (layout === 'site') {
      const L = (h, k, t) => `<li><a href="${h}" class="${page === k ? 'on' : ''}" ${page === k ? 'aria-current="page"' : ''}>${t}</a></li>`;
      const homeOn = page === 'home1' || page === 'home2';
      $('#site-nav').innerHTML = `<nav class="nav" aria-label="Main"><div class="wrap">${logo('index.html')}
        <button class="icon-btn burger" id="burger" aria-label="Toggle menu" aria-expanded="false">${ICON.menu.replace('<svg', '<svg class="m"')}${ICON.close.replace('<svg', '<svg class="x"')}</button>
        <div class="panel" id="panel"><ul class="links"><li class="dd" id="dd"><button class="dd-btn ${homeOn ? 'on' : ''}" aria-expanded="false">Home <span aria-hidden="true">▾</span></button>
        <ul class="dd-menu"><li><a href="index.html" class="${page === 'home1' ? 'on' : ''}">Home 1<small>Programs &amp; results</small></a></li><li><a href="home-2.html" class="${page === 'home2' ? 'on' : ''}">Home 2<small>Class finder</small></a></li></ul></li>
        ${L('about.html', 'about', 'About')}${L('classes.html', 'classes', 'Classes')}${L('trainers.html', 'trainers', 'Trainers')}${L('contact.html', 'contact', 'Contact')}${L('dashboard.html', 'dashboard', 'Dashboard')}</ul>
        <div class="actions">${tg}<a class="btn" href="login.html">Login</a><a class="btn btn-p" href="contact.html#join">Join Now</a></div></div></div></nav>`;
      const soc = (l, i) => `<a href="#" aria-label="${l}">${ICON[i]}</a>`;
      $('#site-footer').innerHTML = `<footer class="foot"><div class="wrap"><div class="cols">
        <div>${logo('index.html')}<p style="margin-top:14px">A welcoming, women-only fitness center with expert trainers, joyful classes and personal plans.</p><div class="soc">${soc('Instagram', 'ig')}${soc('Facebook', 'fb')}${soc('YouTube', 'yt')}${soc('WhatsApp', 'wa')}</div></div>
        <div><h4>Explore</h4><ul><li><a href="index.html">Home 1</a></li><li><a href="home-2.html">Home 2</a></li><li><a href="about.html">About</a></li><li><a href="classes.html">Classes</a></li><li><a href="trainers.html">Trainers</a></li><li><a href="contact.html">Contact</a></li><li><a href="login.html">Member login</a></li></ul></div>
        <div><h4>Visit us</h4><ul class="ct"><li>${ICON.pin}<span>Bloom Women's Fitness Center, 27 Lotus Garden Road, Adyar, Chennai 600020</span></li><li>${ICON.phone}<a href="tel:+914455507788">+91 44 5550 7788</a></li><li>${ICON.mail}<a href="mailto:hello@bloomfitness.example">hello@bloomfitness.example</a></li><li>${ICON.clock}<span>Mon–Sat 5:30 AM – 9:30 PM · Sun 7 AM – 1 PM</span></li></ul></div>
        <div><h4>Weekly wellness tips</h4><p>Join our newsletter for class launches, recipes and member offers.</p><form class="news" id="news" novalidate><input id="news-e" type="email" placeholder="Email address" aria-label="Email address"><button class="btn btn-p" type="submit">Subscribe</button></form><div class="news-m" id="news-m" role="status"></div></div>
        </div><div class="copy">© 2026 Bloom Women's Fitness Center. All rights reserved. · Privacy · Terms · Membership policy</div></div></footer><button class="top" id="top" aria-label="Back to top">↑</button>`;
      const panel = $('#panel'), burger = $('#burger'), dd = $('#dd');
      const closeDD = () => { dd.classList.remove('open'); $('.dd-btn', dd).setAttribute('aria-expanded', 'false'); };
      const closeMenu = () => { panel.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); closeDD(); };
      burger.onclick = () => { const o = panel.classList.toggle('open'); burger.setAttribute('aria-expanded', o); if (!o) closeDD(); };
      $('.dd-btn', dd).onclick = e => { e.stopPropagation(); const o = dd.classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', o); };
      panel.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
      document.addEventListener('click', e => { if (!dd.contains(e.target)) closeDD(); if (!e.target.closest('.nav')) closeMenu(); });
      document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
      const top = $('#top'); addEventListener('scroll', () => top.classList.toggle('show', scrollY > 400), { passive: true }); top.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
      $('#news').addEventListener('submit', e => { e.preventDefault(); $('#news-m').textContent = valid.email($('#news-e').value.trim()) ? 'Thank you for subscribing. Your first wellness tips arrive this week.' : 'Please enter a valid email address.'; });
      bindToggles();
    } else if (layout === 'auth') {
      $('#auth-nav').innerHTML = `<div class="auth-nav"><div class="wrap">${logo('index.html')}<div class="actions">${tg}</div></div></div>`;
      bindToggles();
    }
    $$('[data-tabs]').forEach(w => { const tabs = $$('.dtab', w), ps = $$('.dpanel', w); tabs.forEach(t => t.addEventListener('click', () => { tabs.forEach(x => { x.classList.toggle('on', x === t); x.setAttribute('aria-selected', x === t); }); ps.forEach(q => q.classList.toggle('on', q.id === t.dataset.tab)); })); });
    $$('details').forEach(d => d.addEventListener('toggle', () => { if (d.open) $$('details').forEach(o => { if (o !== d && o.parentElement === d.parentElement) o.open = false; }); }));
    const mt = $('#matcher');
    if (mt) { const R = { 'strength-b': 'Strength Foundations: Mon & Wed 6:30 AM, ₹1,200 per month add-on', 'strength-i': 'Sculpt & Lift: Tue & Thu 7:00 PM, small-group weights', 'strength-a': 'Power Lab: Mon, Wed & Fri 6:00 PM, heavy compound lifting',
      'burn-b': 'Cardio Kickstart: Tue & Sat 7:30 AM, low-impact intervals', 'burn-i': 'HIIT Fusion: Mon & Thu 7:00 PM, 45-minute intervals', 'burn-a': 'Burn 60: Wed & Fri 6:30 PM, advanced conditioning',
      'calm-b': 'Gentle Yoga: Daily 7:00 AM, slow flow for beginners', 'calm-i': 'Vinyasa Flow: Tue & Thu 6:30 AM, breath-led movement', 'calm-a': 'Aerial & Power Yoga: Sat 9:00 AM, advanced inversions',
      'dance-b': 'Dance Fit Basics: Sat 5:00 PM, easy Bollywood and Zumba steps', 'dance-i': 'Zumba Party: Mon & Fri 7:30 PM, high-energy choreography', 'dance-a': 'Dance Cardio Pro: Wed 7:30 PM, fast routines' };
      mt.addEventListener('submit', e => { e.preventDefault(); const g = $('#m-goal').value, l = $('#m-level').value; $('#m-out').textContent = 'Your best match: ' + R[g + '-' + l] + '. Book a free trial to try it.'; }); }
    const jf = $('#join');
    if (jf) jf.addEventListener('submit', e => {
      e.preventDefault(); let ok = true;
      const chk = (id, test, m) => { const el = $('#' + id), er = $('#' + id + '-e'), bad = !test(el.value.trim()); el.classList.toggle('bad', bad); er.textContent = bad ? m : ''; if (bad) ok = false; };
      chk('j-name', v => v.length > 1, 'Please enter your full name.'); chk('j-email', valid.email, 'Enter a valid email address.'); chk('j-phone', valid.phone, 'Enter a valid phone number.'); chk('j-int', v => v !== '', 'Choose a class interest.');
      const m = $('#j-msg'); m.classList.add('show'); m.textContent = ok ? 'Thank you! Your free trial request has been received. Our team will call you within one working day to confirm your class.' : 'Please fix the highlighted fields.';
    });
    const LD = $('#loader');
    if (LD) { const t0 = performance.now(); let gone = false; const done = () => { if (gone) return; gone = true; setTimeout(() => { LD.classList.add('hide'); setTimeout(() => LD.remove(), 600); }, Math.max(0, 800 - (performance.now() - t0))); };
      if (document.readyState === 'complete') done(); else addEventListener('load', done); setTimeout(done, 3500); }
  });
})();

/* Fill image placeholders: data-slot="img-NN" -> assets/images/photos/img-NN-*.jpg */
(function(){
  var F={"15": "img-15-index-start-your-bloom-banner.jpg", "34": "img-34-classes-class-aerial-yoga.jpg", "68": "img-68-dashboard-meal-lunch-chicken-salad.jpg", "52": "img-52-trainers-team-kavya-menon.jpg", "11": "img-11-index-member-results-stretching.jpg", "53": "img-53-trainers-team-priyanka-rajan.jpg", "36": "img-36-classes-class-sculpt-tone.jpg", "60": "img-60-trainers-specialist-rekha-pillai.jpg", "50": "img-50-trainers-team-roshni-das.jpg", "17": "img-17-home-2-program-sculpt-strength.jpg", "26": "img-26-home-2-first-class-banner.jpg", "12": "img-12-index-testimonial-priya-natarajan.jpg", "01": "img-01-index-hero-background.jpg", "65": "img-65-login-left-panel-background.jpg", "37": "img-37-classes-class-flow-yoga.jpg", "63": "img-63-contact-page-hero-reception.jpg", "21": "img-21-home-2-nutrition-section.jpg", "28": "img-28-about-our-story-yoga.jpg", "02": "img-02-index-program-strength-tone.jpg", "41": "img-41-classes-class-zumba-party.jpg", "61": "img-61-trainers-specialist-kavya-menon.jpg", "24": "img-24-home-2-gallery-03-group-squats.jpg", "56": "img-56-trainers-team-shruti-venkat.jpg", "49": "img-49-trainers-team-nisha-rao.jpg", "44": "img-44-classes-class-dance-cardio-pro.jpg", "16": "img-16-home-2-hero-background.jpg", "33": "img-33-classes-class-strength-lab.jpg", "30": "img-30-about-our-journey-yoga.jpg", "23": "img-23-home-2-gallery-02-dance-routine.jpg", "20": "img-20-home-2-program-meditation-recovery.jpg", "29": "img-29-about-values-community.jpg", "04": "img-04-index-program-dance-fitness.jpg", "51": "img-51-trainers-team-meera-iyer.jpg", "03": "img-03-index-program-yoga-mindfulness.jpg", "59": "img-59-trainers-specialist-sneha-kapoor.jpg", "32": "img-32-classes-page-hero.jpg", "47": "img-47-trainers-team-anjali-shah.jpg", "10": "img-10-index-trainer-kavya-menon.jpg", "35": "img-35-classes-class-core-blast.jpg", "27": "img-27-about-page-hero.jpg", "14": "img-14-index-testimonial-lakshmi-venkat.jpg", "39": "img-39-classes-class-power-lab.jpg", "18": "img-18-home-2-program-yoga-flow.jpg", "19": "img-19-home-2-program-hiit-cardio.jpg", "57": "img-57-trainers-team-harini-subbu.jpg", "05": "img-05-index-program-hiit-cardio.jpg", "55": "img-55-trainers-team-farah-khan.jpg", "38": "img-38-classes-class-nutrition-workshop.jpg", "42": "img-42-classes-class-mat-pilates-core.jpg", "25": "img-25-home-2-gallery-04-brick-yoga.jpg", "58": "img-58-trainers-team-tara-george.jpg", "62": "img-62-trainers-specialist-aisha-thomas.jpg", "43": "img-43-classes-class-gentle-yoga.jpg", "48": "img-48-trainers-team-divya-nair.jpg", "13": "img-13-index-testimonial-fatima-sheikh.jpg", "67": "img-67-dashboard-meal-breakfast-avocado-bowl.jpg", "08": "img-08-index-trainer-anjali-shah.jpg", "69": "img-69-dashboard-meal-dinner-lemon-herb-chicken.jpg", "45": "img-45-trainers-page-hero.jpg", "07": "img-07-index-trainer-meera-iyer.jpg", "40": "img-40-classes-class-hiit-fusion.jpg", "64": "img-64-contact-start-your-journey-banner.jpg", "54": "img-54-trainers-team-lakshmi-narayan.jpg", "06": "img-06-index-why-bloom-training.jpg", "09": "img-09-index-trainer-divya-nair.jpg", "22": "img-22-home-2-gallery-01-pink-dumbbells.jpg", "46": "img-46-trainers-head-coach-meera-iyer.jpg", "31": "img-31-about-meet-the-team-banner.jpg", "66": "img-66-create-account-left-panel-background.jpg"};
  function fill(root){
    (root||document).querySelectorAll('.imgph[data-slot]:not([data-done])').forEach(function(el){
      var f=F[(el.dataset.slot||'').replace('img-','')]; if(!f) return;
      el.dataset.done='1';
      var im=new Image(); im.className='ph-img'; im.alt=el.dataset.alt||''; im.loading='lazy'; im.decoding='async';
      im.src='assets/images/photos/'+f; el.appendChild(im);
    });
  }
  window.fillSlots=fill;
  document.addEventListener('DOMContentLoaded',function(){fill();});
  new MutationObserver(function(){fill();}).observe(document.documentElement,{childList:true,subtree:true});
})();

/* Scroll-reveal + count-up animations */
(function(){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  var layout=document.body.getAttribute('data-layout');
  if (layout==='dash') return;
  document.documentElement.classList.add('anim');
  var SEL=['main .sec .wrap > *','main .grid > *','main .split > *','main .vsplit > *','main .vitem','main .jr li','main .band .wrap > div','main .gal > *','main .stepper > *','main .cta','main .faq details'].join(',');
  var SKIP='.grid,.gal,.stepper,.split,.vsplit,.jr,.hero,.phero';
  function setup(){
    var els=[].slice.call(document.querySelectorAll(SEL)).filter(function(e){return !e.matches(SKIP)&&!e.closest('.hero,.phero')&&!e.classList.contains('rv');});
    var io=new IntersectionObserver(function(es){
      es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); count(en.target);} });
    },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(e){
      var sib=e.parentElement?[].indexOf.call(e.parentElement.children,e):0;
      e.style.setProperty('--d',(Math.min(sib,6)*0.09)+'s');
      e.classList.add('rv');
      if(e.matches('.split > *')){ e.classList.add(sib%2?'fromR':'fromL'); }
      if(e.matches('.jr li')){ e.classList.add(sib%2?'fromR':'fromL'); }
      if(e.matches('.band .wrap > div,.stepper > *')) e.classList.add('zoom');
      io.observe(e);
    });
  }
  function count(root){
    root.querySelectorAll('.big,.band b').forEach(function(n){
      if(n.dataset.cnt) return; n.dataset.cnt=1;
      var m=n.textContent.trim().match(/^(\d[\d,]*)(\+|%)?$/); if(!m) return;
      var end=parseInt(m[1].replace(/,/g,''),10), suf=m[2]||'', big=end>=1000, t0=performance.now(), dur=1400;
      (function step(t){ var k=Math.min(1,(t-t0)/dur), v=Math.round(end*(1-Math.pow(1-k,3)));
        n.textContent=(big?v.toLocaleString('en-US'):v)+suf; if(k<1) requestAnimationFrame(step); })(t0);
    });
    if(root.matches&&root.matches('.big,.band b')) count({querySelectorAll:function(){return [root];}});
  }
  function start(){ setup(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
})();

/* Dashboard KPI count-up */
(function(){
  if (document.body.getAttribute('data-layout')!=='dash' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  function run(){
    document.querySelectorAll('.pn.on .kpi .card > b').forEach(function(n){
      if(n.dataset.cnt) return; n.dataset.cnt=1;
      var m=n.textContent.trim().match(/^(\D*)(\d[\d,]*)(.*)$/); if(!m) return;
      var end=parseInt(m[2].replace(/,/g,''),10), comma=m[2].indexOf(',')>-1, t0=performance.now();
      (function step(t){ var k=Math.min(1,(t-t0)/1200), v=Math.round(end*(1-Math.pow(1-k,3)));
        n.textContent=m[1]+(comma?v.toLocaleString('en-IN'):v)+m[3]; if(k<1) requestAnimationFrame(step); })(t0);
    });
  }
  addEventListener('load',function(){ setTimeout(run,300); });
  addEventListener('hashchange',function(){ setTimeout(run,150); });
})();
