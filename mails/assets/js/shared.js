/** Shared navigation and animation timing. This is a playful UI lock only. */
window.Mail = (() => {
  const key = 'birthday-letter-unlocked';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function unlock() {
    try {
      sessionStorage.setItem(key, 'yes');
      return true;
    } catch {
      return false;
    }
  }

  function requireUnlock() {
    try {
      if (sessionStorage.getItem(key) === 'yes') return true;
    } catch { /* Fall through to the lock page when storage is unavailable. */ }
    window.location.replace('../index.html');
    return false;
  }

  function relock() {
    try {
      sessionStorage.removeItem(key);
    } finally {
      window.location.replace('../index.html');
    }
  }

  window.addEventListener('pageshow', () => {
    if (document.body.dataset.protected === 'true') requireUnlock();
  });

  return Object.freeze({
    unlock,
    requireUnlock,
    relock,
    navigate: page => window.location.assign(page),
    pause: milliseconds => new Promise(resolve => {
      window.setTimeout(resolve, reducedMotion.matches ? 20 : milliseconds);
    }),
  });
})();
