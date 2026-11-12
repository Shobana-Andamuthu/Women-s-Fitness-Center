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

/* Fill image placeholders: data-slot="img-NN" -> Pexels hotlinked URL */
(function(){
  var F={"10":["assets/images/trainers/kavya-menon.jpg","Kavya Menon, yoga teacher, meditating in lotus pose","56% 40%"],"11":["assets/images/photos/img-11-index-member-results-stretching.jpg","Woman stretching during a recovery session"],"12":["assets/images/photos/img-12-index-testimonial-priya-natarajan.jpg","Portrait of a smiling woman"],"13":["assets/images/photos/img-13-index-testimonial-fatima-sheikh.jpg","Portrait of a smiling woman"],"14":["assets/images/photos/img-14-index-testimonial-lakshmi-venkat.jpg","Portrait of a smiling woman"],"15":["assets/images/photos/img-15-index-start-your-bloom-banner.jpg","Women in activewear sharing a group high five"],"16":["assets/images/photos/img-16-home-2-hero-background.jpg","Women training together in a modern fitness studio"],"17":["assets/images/photos/img-17-home-2-program-sculpt-strength.jpg","Woman raising dumbbells during a strength session"],"18":["assets/images/photos/img-18-home-2-program-yoga-flow.jpg","People practicing yoga in a studio"],"19":["assets/images/photos/img-19-home-2-program-hiit-cardio.jpg","Women exercising together in a group class"],"20":["assets/images/photos/img-20-home-2-program-meditation-recovery.jpg","Relaxed woman meditating in lotus pose"],"21":["assets/images/photos/img-21-home-2-nutrition-section.jpg","Healthy bowl of cooked meat and vegetables"],"22":["assets/images/photos/img-22-home-2-gallery-01-pink-dumbbells.jpg","Woman working out with dumbbells"],"23":["assets/images/photos/img-23-home-2-gallery-02-dance-routine.jpg","Women celebrating with a high five during group training"],"24":["assets/images/photos/img-24-home-2-gallery-03-group-squats.jpg","Women doing squats in a group fitness class"],"25":["assets/images/photos/img-25-home-2-gallery-04-brick-yoga.jpg","Group of women doing yoga in a studio"],"26":["assets/images/photos/img-26-home-2-first-class-banner.jpg","Women exercising together in their first class"],"27":["assets/images/photos/img-27-about-page-hero.jpg","Group of women meditating in a modern studio"],"28":["assets/images/photos/img-28-about-our-story-yoga.jpg","Woman doing a yoga pose in a calm studio"],"29":["assets/images/photos/img-29-about-values-community.jpg","Three women kneeling together on the floor after a workout"],"31":["assets/images/photos/img-31-about-meet-the-team-banner.jpg","Coach reaching a hand out to a woman during training"],"32":["assets/images/photos/img-32-classes-page-hero.jpg","Women practicing yoga in a class"],"33":["assets/images/photos/img-33-classes-class-strength-lab.jpg","Woman doing a deadlift in a gym"],"34":["assets/images/photos/img-34-classes-class-aerial-yoga.jpg","Woman doing aerial yoga with an instructor behind her"],"35":["assets/images/photos/img-35-classes-class-core-blast.jpg","Woman doing a core exercise on a yoga mat with a trainer"],"36":["assets/images/photos/img-36-classes-class-sculpt-tone.jpg","Woman holding exercise equipment during a sculpting workout"],"37":["assets/images/photos/img-37-classes-class-flow-yoga.jpg","Yoga instructor helping a student into a pose"],"38":["assets/images/photos/img-38-classes-class-nutrition-workshop.jpg","Fresh salad with sliced avocado in a bowl"],"39":["assets/images/photos/img-39-classes-class-power-lab.jpg","Woman holding exercise ropes for power training"],"40":["assets/images/photos/img-40-classes-class-hiit-fusion.jpg","Woman doing a high-intensity crossfit workout"],"41":["assets/images/photos/classes-zumba-party-new.jpg","Women enjoying a fitness dance class"],"42":["assets/images/photos/classes-mat-pilates-new.jpg","Woman doing Pilates"],"43":["assets/images/photos/img-43-classes-class-gentle-yoga.jpg","Women doing gentle yoga"],"44":["assets/images/photos/img-44-classes-class-dance-cardio-pro.jpg","Women doing cardio squats in a group class"],"45":["assets/images/photos/img-45-trainers-page-hero.jpg","Yoga instructor helping students in class"],"46":["assets/images/photos/img-46-trainers-head-coach-meera-iyer.jpg","Woman in sportswear looking at the camera in a gym"],"47":["assets/images/trainers/anjali-shah.jpg","Anjali Shah, powerlifting coach, flexing in the gym","50% 25%"],"48":["assets/images/photos/img-48-trainers-team-divya-nair.jpg","Woman wearing workout clothes"],"49":["assets/images/trainers/nisha-rao.jpg","Nisha Rao, Pilates instructor, smiling in the studio","50% 30%"],"50":["assets/images/photos/img-50-trainers-team-roshni-das.jpg","Woman in sportswear sitting on a treadmill in the gym"],"51":["assets/images/photos/img-51-trainers-team-meera-iyer.jpg","Smiling woman preparing for training outdoors"],"52":["assets/images/trainers/kavya-menon.jpg","Kavya Menon, yoga teacher, meditating in lotus pose","56% 40%"],"53":["assets/images/trainers/priyanka-rajan.jpg","Priyanka Rajan, Zumba instructor, dancing in a class","42% 40%"],"54":["assets/images/photos/img-54-trainers-team-lakshmi-narayan.jpg","Woman holding a kettlebell inside a gym"],"55":["assets/images/photos/img-55-trainers-team-farah-khan.jpg","Happy woman giving a high five"],"56":["assets/images/trainers/shruti-venkat.jpg","Shruti Venkat, postnatal specialist, smiling in a white coat","50% 35%"],"57":["assets/images/trainers/harini-subbu.jpg","Harini Subbu, aerial yoga teacher, seated in a silk hammock","46% 40%"],"58":["assets/images/photos/img-58-trainers-team-tara-george.jpg","Woman stretching"],"59":["assets/images/photos/img-59-trainers-specialist-sneha-kapoor.jpg","Woman stretching during mobility work"],"60":["assets/images/trainers/rekha-pillai.png","Dr. Rekha Pillai, physiotherapist"],"61":["assets/images/photos/img-61-trainers-specialist-kavya-menon.jpg","Woman practicing meditation in a figure-four posture"],"62":["assets/images/photos/img-62-trainers-specialist-aisha-thomas.jpg","Nutritionist sitting in an office"],"63":["assets/images/photos/img-63-contact-page-hero-reception.jpg","Interior of a modern fitness club with equipment"],"64":["assets/images/photos/img-64-contact-start-your-journey-banner.jpg","Women enjoying a healthy active lifestyle together"],"65":["assets/images/photos/img-65-login-left-panel-background.jpg","Modern gym interior with rowing machines"],"66":["assets/images/photos/img-66-create-account-left-panel-background.jpg","Women doing yoga together"],"67":["assets/images/photos/img-67-dashboard-meal-breakfast-avocado-bowl.jpg","Avocado toast on a white plate"],"68":["assets/images/photos/img-68-dashboard-meal-lunch-chicken-salad.jpg","Healthy salad in a bowl"],"69":["assets/images/photos/img-69-dashboard-meal-dinner-lemon-herb-chicken.jpg","Lunch plate with grilled meat"],"01":["assets/images/photos/img-01-index-hero-background.jpg","Group of women exercising together in a bright fitness studio"],"02":["assets/images/photos/img-02-index-program-strength-tone.jpg","Woman lifting dumbbells during a strength workout"],"03":["assets/images/photos/img-03-index-program-yoga-mindfulness.jpg","Group of women practicing yoga together"],"04":["assets/images/photos/img-04-index-program-dance-fitness.jpg","Group of women in black sportswear doing a dance fitness workout"],"05":["assets/images/photos/img-05-index-program-hiit-cardio.jpg","Group of women doing a high-energy cardio workout"],"06":["assets/images/photos/img-06-index-why-bloom-training.jpg","Personal trainer coaching a woman on a gym cycling machine"],"07":["assets/images/photos/img-07-index-trainer-meera-iyer.jpg","Smiling woman in activewear at a gym reception desk"],"08":["assets/images/trainers/anjali-shah.jpg","Anjali Shah, powerlifting coach, flexing in the gym","50% 25%"],"09":["assets/images/photos/img-09-index-trainer-divya-nair.jpg","Smiling woman in activewear carrying a gym bag"]};
  function fill(root){
    (root||document).querySelectorAll('.imgph[data-slot]:not([data-done])').forEach(function(el){
      var f=F[(el.dataset.slot||'').replace('img-','')]; if(!f) return;
      el.dataset.done='1';
      var im=new Image(); im.className='ph-img'; im.alt=f[1]||el.dataset.alt||''; im.loading='lazy'; im.decoding='async';
      im.referrerPolicy='no-referrer'; if(f[2]) im.style.objectPosition=f[2]; im.src=f[0]; el.appendChild(im);
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
