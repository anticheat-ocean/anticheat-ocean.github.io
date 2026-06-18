(() => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');

  const syncHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  menuButton?.addEventListener('click', () => {
    const open = nav?.classList.toggle('is-open') ?? false;
    menuButton.setAttribute('aria-expanded', String(open));
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton?.setAttribute('aria-expanded', 'false');
    });
  });

  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const open = item?.classList.toggle('is-open') ?? false;
      button.setAttribute('aria-expanded', String(open));
    });
  });

  const fileSize = document.querySelector('[data-file-size]');
  const fileState = document.querySelector('[data-file-state]');
  if (fileSize || fileState) {
    fetch('/setup/ocean.exe', { method: 'HEAD', cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error('Release unavailable');
        const bytes = Number(response.headers.get('content-length'));
        if (fileSize && Number.isFinite(bytes) && bytes > 0) {
          fileSize.textContent = `${(bytes / 1024 / 1024).toFixed(1)} MB`;
        }
        if (fileState) fileState.textContent = 'Available';
      })
      .catch(() => {
        if (fileSize) fileSize.textContent = '—';
        if (fileState) fileState.textContent = 'Temporarily unavailable';
      });
  }
})();
