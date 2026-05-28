
  // Theme toggle
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('ns-theme');
  if(saved === 'dark'){ root.classList.add('dark'); } // (Optional light theme later)

  if(themeBtn){
    themeBtn.onclick = ()=>{
      root.classList.toggle('dark');
      localStorage.setItem('ns-theme', root.classList.contains('dark') ? 'dark' : 'light');
    };
  }

  // Mobile nav
  document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
  
    if (hamburger && nav) {
  
      hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('open');
      });
  
      document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
          nav.classList.remove('open');
        }
      });
  
    }
  
  });

  // AOS + Swiper
  AOS.init({ duration: 650, once: true, offset: 70 });
  document.querySelectorAll('.swiper').forEach(sw =>
    new Swiper(sw, {
      slidesPerView: 1,
      spaceBetween: 16,
      pagination: { el: sw.querySelector('.swiper-pagination'), clickable: true },
      breakpoints:{ 900:{slidesPerView:2} }
    })
  );

  // Tabs (Projects filters)
  document.querySelectorAll('.tabs').forEach(tabWrap => {
    const btns = tabWrap.querySelectorAll('.tab');
    btns.forEach(btn => btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const grid = document.querySelector('.projects-grid');
      if(!grid) return;
      grid.querySelectorAll('.project-card').forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        card.style.display = match ? '' : 'none';
        if(match){ card.animate([{opacity:0, transform:'translateY(8px)'},{opacity:1, transform:'translateY(0)'}], {duration:250}); }
      });
    }));
  });

  // Contact tabs
  document.querySelectorAll('.contact-tabs .tab-buttons .tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.contact-tabs .tab-buttons .tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.contact-tabs .form').forEach(p => p.classList.remove('active'));
      const target = document.querySelector(btn.dataset.target);
      if(target) target.classList.add('active');
    });
  });

  // Forms (EmailJS optional)
  const toast = document.getElementById('formToast');
  const showToast = (msg) => { if(!toast) return; toast.textContent=msg; toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'),2600); };

  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      showToast('Sending…');
      const payload = Object.fromEntries(new FormData(form).entries());
      payload.form_kind = form.dataset.form;

      // To wire EmailJS:
      // 1) Add the EmailJS script in contact.html (uncomment block).
      // 2) Replace YOUR_SERVICE_ID / YOUR_TEMPLATE_ID / YOUR_PUBLIC_KEY.
      // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', payload);

      setTimeout(()=> showToast('Sent! We’ll reply shortly.'), 1200);
      form.reset();
    });
  });

  // Footer year
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();

// ---------- Page enter / exit ----------
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-ready');        // fade-in
});

// (Optional) smooth fade-out on internal nav
document.addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if (!a) return;
  const isSameOrigin = a.origin === location.origin;
  const isHash = a.getAttribute('href')?.startsWith('#');
  const newTab = a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
  if (isSameOrigin && !isHash && !newTab) {
    e.preventDefault();
    document.body.classList.add('page-exit');
    setTimeout(() => (window.location.href = a.href), 180);
  }
});

// ---------- AOS (scroll reveal) ----------
AOS.init({ duration: 650, once: true, offset: 70 });

(function applyScrollReveals() {
  // selector => default animation
  const groups = [
    ['.page-hero h1, .page-hero p', 'fade-up'],
    ['.card', 'fade-up'],
    ['.projects-grid .project-card', 'zoom-in'],
    ['.featured-card', 'fade-up'],
    ['.blog-card', 'fade-up'],
    ['.team .profile', 'fade-up'],
    ['.process .steps li', 'fade-left'],
    ['.contact-tabs .form', 'fade-up'],
    ['footer .footer-grid > *', 'fade-up']
  ];

  groups.forEach(([sel, anim]) => {
    const nodes = document.querySelectorAll(sel);
    nodes.forEach((el, i) => {
      if (!el.hasAttribute('data-aos')) el.setAttribute('data-aos', anim);
      // Gentle stagger (0,50,100,150… up to 300 then loops)
      el.setAttribute('data-aos-delay', String((i % 6) * 50));
    });
  });
})();

// ---------- Optional subtle parallax on hero & big images ----------
const parallaxEls = document.querySelectorAll('[data-parallax]');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  parallaxEls.forEach(el => {
    const speed = parseFloat(el.dataset.parallax) || 0.15;
    el.style.transform = `translateY(${y * speed}px)`;
  });
}, { passive: true });

// Keep existing code below (theme toggle, mobile nav, sliders, forms, etc.)
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('page-ready');
  });

  // Safe AOS init (won’t crash if AOS missing)
  try { AOS && AOS.init({ duration:650, once:true, offset:70 }); } catch(e){}
