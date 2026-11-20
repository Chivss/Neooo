/** Password validation and padlock animation for index.html. */
(() => {
  const password = '1116';
  const form = document.getElementById('unlock-form');
  const input = document.getElementById('password');
  const error = document.getElementById('error');
  const screen = document.getElementById('lock-screen');
  const button = form.querySelector('button');
  let busy = false;

  window.addEventListener('pageshow', () => {
    busy = false;
    button.disabled = false;
    screen.classList.remove('unlocked', 'leaving', 'shake');
    form.reset();
    error.textContent = '';
    input.removeAttribute('aria-invalid');
  });

  input.addEventListener('input', () => {
    error.textContent = '';
    input.removeAttribute('aria-invalid');
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (busy) return;

    if (input.value !== password) {
      error.textContent = 'Not quite, love. Try our little secret again.';
      input.setAttribute('aria-invalid', 'true');
      screen.classList.remove('shake');
      void screen.offsetWidth;
      screen.classList.add('shake');
      input.select();
      return;
    }

    if (!Mail.unlock()) {
      error.textContent = 'Please allow session storage and open the site through a local server or GitHub Pages.';
      return;
    }

    busy = true;
    button.disabled = true;
    error.textContent = '';
    input.removeAttribute('aria-invalid');
    screen.classList.add('unlocked');
    await Mail.pause(650);
    screen.classList.add('leaving');
    await Mail.pause(650);
    Mail.navigate('mails/letters.html');
  });
})();
