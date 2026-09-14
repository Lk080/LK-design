(() => {
  'use strict';
  // Review-only component. Leave data-preview="false" until a real service exists.
  const template = document.getElementById('assistant-template');
  if (template.dataset.preview !== 'true') return;
  document.body.append(template.content.cloneNode(true));
  const launcher = document.getElementById('assistant-launcher');
  const dialog = document.getElementById('assistant-dialog');
  launcher.addEventListener('click', () => {
    dialog.showModal();
    launcher.setAttribute('aria-expanded', 'true');
  });
  dialog.querySelector('.assistant-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('a').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    launcher.setAttribute('aria-expanded', 'false');
    launcher.focus();
  });
})();
