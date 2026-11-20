/** Shared animation controller for individual HTML letters. */
(() => {
  document.body.dataset.protected = 'true';
  if (!Mail.requireUnlock()) return;
  const screen = document.getElementById('letter-screen');
  const animation = document.getElementById('letter-animation');
  const reader = document.getElementById('letter-reader');
  const actions = document.getElementById('letter-actions');
  let opening = false;

  async function openLetter() {
    if (opening) return;
    opening = true;
    reader.hidden = true;
    actions.hidden = true;
    animation.hidden = false;
    screen.hidden = false;
    screen.setAttribute('aria-labelledby', 'envelope-title');
    animation.classList.remove('opening');
    // Ensure a replay starts from the closed flap even after a fast click.
    void animation.offsetWidth;
    document.getElementById('envelope-title').focus({ preventScroll: true });
    await Mail.pause(850);
    animation.classList.add('opening');
    await Mail.pause(2200);
    animation.hidden = true;
    animation.classList.remove('opening');
    reader.hidden = false;
    actions.hidden = false;
    screen.setAttribute('aria-labelledby', 'letter-title');
    document.getElementById('letter-title').focus({ preventScroll: false });
    opening = false;
  }

  document.getElementById('back-to-letters').addEventListener('click', () => Mail.navigate('letters.html'));
  document.getElementById('replay').addEventListener('click', openLetter);
  document.getElementById('back-to-message-lists').addEventListener('click', () => Mail.navigate('letters.html'));
  openLetter();
})();
