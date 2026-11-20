(() => {
  'use strict';
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#primary-navigation');

  if (menuButton && navigation) {
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    };
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      navigation.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
      if (open) navigation.querySelector('a')?.focus();
    });
    navigation.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuButton.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeMenu();
    }, { passive: true });
  }

  const hero = document.querySelector('.hero');
  const heroVideo = document.querySelector('#hero-video');
  const videoToggle = document.querySelector('#hero-video-toggle');
  if (hero && heroVideo && videoToggle) {
    const toggleLabel = videoToggle.querySelector('.video-toggle-label');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncVideoControl = () => {
      const playing = !heroVideo.paused && !heroVideo.ended;
      videoToggle.classList.toggle('is-playing', playing);
      videoToggle.setAttribute('aria-label', playing ? 'Pause background film' : 'Play background film');
      if (toggleLabel) toggleLabel.textContent = playing ? 'Pause film' : 'Play film';
    };
    const playHeroVideo = () => {
      const result = heroVideo.play();
      if (result && typeof result.catch === 'function') result.catch(syncVideoControl);
    };

    heroVideo.addEventListener('loadeddata', () => hero.classList.add('is-video-ready'), { once: true });
    heroVideo.addEventListener('playing', syncVideoControl);
    heroVideo.addEventListener('pause', syncVideoControl);
    heroVideo.addEventListener('error', syncVideoControl);
    videoToggle.addEventListener('click', () => {
      if (heroVideo.paused) playHeroVideo();
      else heroVideo.pause();
    });
    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) heroVideo.pause();
      else playHeroVideo();
    });

    if (reducedMotion.matches) syncVideoControl();
    else playHeroVideo();
  }

  const form = document.querySelector('#enquiry-form');
  const status = document.querySelector('#form-status');
  if (form && status) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const details = [
        `Name: ${data.get('name') || ''}`,
        `Company or plant: ${data.get('company') || 'Not provided'}`,
        `Industry: ${data.get('industry') || ''}`,
        `Plant state: ${data.get('state') || ''}`,
        `Approximate quantity: ${data.get('quantity') || 'Not provided'}`,
        `Quality, grade or timing requirements: ${data.get('requirements') || 'Not provided'}`
      ].join('\n');
      const subject = `Supply discussion${data.get('company') ? ` — ${data.get('company')}` : ''}`;
      const href = `mailto:brs@ushodayaenterprise.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(details)}`;
      status.hidden = false;
      status.textContent = 'Your email app should open with the details prefilled. The message is sent only if you send it there.';
      window.location.href = href;
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
