(() => {
  const nav     = document.getElementById('nav');
  const burger  = document.getElementById('burger');
  const links   = document.getElementById('navLinks');
  const backTop = document.getElementById('backTop');
  const form    = document.getElementById('contactForm');

  // Nav scroll state
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
    backTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  // Burger menu
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    links.classList.toggle('open');
  });

  // Close menu on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      links.classList.remove('open');
    });
  });

  // Contact form submit (demo)
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    const orig = btn.textContent;
    btn.textContent = 'Odesíláme…';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Odesláno! Ozve se vám do 24 h.';
      btn.style.background = '#3a6b3a';
      form.reset();
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.disabled = false;
      }, 5000);
    }, 1200);
  });

  // Simple scroll-in animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.service-card, .why-card, .testimonial-card, .stats__item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .45s ease, transform .45s ease';
    observer.observe(el);
  });

  document.addEventListener('animationend', () => {}, { once: true });

  const style = document.createElement('style');
  style.textContent = '.in-view { opacity: 1 !important; transform: none !important; }';
  document.head.appendChild(style);
})();
