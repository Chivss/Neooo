/** Open the envelope and continue to the letter. */
(() => {
  document.body.dataset.protected = 'true';
  if (!Mail.requireUnlock()) return;
  const screen = document.getElementById('envelope-screen');
  let generation = 0;

  async function openEnvelope() {
    const current = ++generation;
    screen.classList.remove('opening');
    screen.classList.add('entering');
    document.getElementById('envelope-title').focus({ preventScroll: true });
    await Mail.pause(850);
    if (current !== generation) return;
    screen.classList.add('opening');
    await Mail.pause(2200);
    if (current === generation) Mail.navigate('letters.html');
  }

  window.addEventListener('pageshow', () => {
    if (Mail.requireUnlock()) openEnvelope();
  });
  window.addEventListener('pagehide', () => { generation += 1; });
})();
