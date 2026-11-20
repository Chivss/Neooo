/** Card catalog: every card links to a separate HTML letter. */
(() => {
  document.body.dataset.protected = 'true';
  if (!Mail.requireUnlock()) return;
  const cards = document.getElementById('letter-cards');
  const entries = window.Letters || [];
  entries.forEach((entry, index) => {
    const link = document.createElement('a');
    link.className = 'letter-card';
    link.setAttribute('href', entry.href);
    const label = document.createElement('span');
    label.className = 'card-number';
    label.textContent = 'LETTER ' + String(index + 1).padStart(2, '0');
    const title = document.createElement('span');
    title.className = 'card-title';
    title.textContent = entry.cardTitle;
    const date = document.createElement('time');
    date.className = 'card-date';
    if (/^\d{4}-\d{2}-\d{2}$/.test(entry.createdAt || '')) {
      const value = new Date(entry.createdAt + 'T00:00:00Z');
      if (!Number.isNaN(value.getTime()) && value.toISOString().slice(0, 10) === entry.createdAt) {
        date.setAttribute('datetime', entry.createdAt);
        date.textContent = new Intl.DateTimeFormat('en-US', {
          month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
        }).format(value);
      }
    }
    date.hidden = !date.textContent;
    const preview = document.createElement('span');
    preview.className = 'card-preview';
    preview.textContent = entry.preview || 'A little letter, just for you.';
    const action = document.createElement('span');
    action.className = 'card-action';
    action.textContent = 'Read this letter \u2192';
    link.append(label, title, date, preview, action);
    cards.append(link);
  });
  if (!entries.length) document.getElementById('library-intro').textContent = 'A little love will be waiting here soon.';
  document.getElementById('letter-library').hidden = false;
  document.getElementById('library-title').focus({ preventScroll: true });
  document.getElementById('relock').addEventListener('click', Mail.relock);
})();
