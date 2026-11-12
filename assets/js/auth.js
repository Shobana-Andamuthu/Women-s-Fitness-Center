(function () {
  const B = window.BLOOM, { $, ICON, valid } = B;
  document.addEventListener('DOMContentLoaded', () => {
    const f = $('#authform'), mode = document.body.dataset.page;
    document.querySelectorAll('.pw button').forEach(btn => { btn.innerHTML = ICON.eye; btn.onclick = () => { const i = btn.previousElementSibling, s = i.type === 'password'; i.type = s ? 'text' : 'password'; btn.setAttribute('aria-label', s ? 'Hide password' : 'Show password'); }; });
    const go = () => { location.href = 'dashboard.html'; };
    document.querySelectorAll('.sbtn').forEach(b => b.addEventListener('click', go));
    const fp = $('#forgot'); if (fp) fp.onclick = e => { e.preventDefault(); const m = $('#a-msg'); m.className = 'msg show'; m.style.display = 'block'; m.textContent = 'We have sent a password reset link to your registered email address.'; };
    f.addEventListener('submit', e => {
      e.preventDefault(); let ok = true;
      const chk = (id, test, msg) => { const el = $('#' + id); if (!el) return; const bad = !test(el.value.trim()); el.classList.toggle('bad', bad); $('#' + id + '-e').textContent = bad ? msg : ''; if (bad) ok = false; };
      if (mode === 'register') { chk('name', v => v.length > 1, 'Enter your full name.'); chk('phone', valid.phone, 'Enter a valid phone number.'); }
      chk('email', valid.email, 'Enter a valid email address.'); chk('password', v => v.length >= 8, 'Use at least 8 characters.');
      if (mode === 'register') { chk('confirm', v => v === $('#password').value && v.length >= 8, 'Passwords do not match.'); const t = $('#terms'); if (!t.checked) { ok = false; $('#terms-e').textContent = 'Please accept the terms to continue.'; } else $('#terms-e').textContent = ''; }
      const m = $('#a-msg'); m.className = 'msg show'; m.style.display = 'block';
      if (!ok) { m.textContent = 'Please fix the highlighted fields.'; return; }
      m.textContent = mode === 'register' ? 'Your account is ready. Taking you to your dashboard…' : 'Welcome back! Taking you to your dashboard…'; setTimeout(go, 700);
    });
  });
})();
