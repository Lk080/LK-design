(() => {
  'use strict';
  const builder = document.getElementById('project-builder');
  builder.hidden = false;
  const form = document.getElementById('contact-form');
  const pages = document.getElementById('project-pages');
  const typeLabels = { new: 'Een nieuwe website', existing: 'Mijn bestaande website laten beoordelen', automation: 'AI en automatisering' };
  const prices = {
    '1-3': document.querySelector('[data-plan="start"]').dataset.startPrice,
    '5-7': document.querySelector('[data-plan="groei"]').dataset.startPrice
  };
  const format = number => new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Number(number));
  function selection() {
    const type = builder.querySelector('[name="project-type"]:checked').value;
    const extras = [...builder.querySelectorAll('[name="project-extra"]:checked')].map(input => input.value);
    let label = 'Persoonlijk voorstel';
    let price = 'Op offerte';
    let detail = 'We bespreken de omvang en maken eerst een duidelijk voorstel.';
    if (type === 'new' && prices[pages.value]) {
      label = pages.value === '1-3' ? 'Start' : 'Groei';
      price = `Vanaf ${format(prices[pages.value])}`;
      detail = `${pages.value.replace('-', ' tot ')} pagina’s in één taal, inclusief contactformulier.`;
      if (extras.length) detail += ' Dit is alleen de basisprijs. De gekozen extra’s worden apart begroot.';
    } else if (type === 'existing') {
      label = 'Eerst beoordelen';
      detail = 'We bekijken het huidige systeem, de toegangen en je wensen. Daarna volgt een gericht voorstel.';
    } else if (type === 'automation') {
      label = 'Slim maatwerk';
      detail = 'De prijs hangt af van je werkproces, koppelingen en gewenste functies.';
    }
    return { type, extras, label, price, detail };
  }
  function render() {
    const selected = selection();
    document.getElementById('page-options').hidden = selected.type !== 'new';
    pages.disabled = selected.type !== 'new';
    document.getElementById('estimate-package').textContent = selected.label;
    document.getElementById('estimate-price').textContent = selected.price;
    document.getElementById('estimate-detail').textContent = selected.detail;
  }
  builder.addEventListener('change', render);
  render();
  document.getElementById('use-estimate').addEventListener('click', () => {
    if (form.getAttribute('aria-busy') === 'true') return;
    const selected = selection();
    const summary = [typeLabels[selected.type], selected.type === 'new' ? `Pagina’s: ${pages.options[pages.selectedIndex].text}` : '', `Richting: ${selected.label} — ${selected.price} (indicatief, excl. btw)`, `Extra’s: ${selected.extras.join(', ') || 'Geen geselecteerd'}`, 'Extra functies en abonnementskosten worden afzonderlijk begroot.'].filter(Boolean).join('\n');
    document.getElementById('interest').value = typeLabels[selected.type];
    document.getElementById('selected-package').value = selected.label;
    document.getElementById('project-summary').value = summary;
    document.getElementById('request-plan-text').textContent = summary;
    document.getElementById('request-plan').hidden = false;
    form.dispatchEvent(new Event('input', { bubbles: true }));
  });
  document.getElementById('remove-plan').addEventListener('click', () => {
    document.getElementById('project-summary').value = '';
    document.getElementById('selected-package').value = '';
    document.getElementById('request-plan').hidden = true;
    form.dispatchEvent(new Event('input', { bubbles: true }));
    document.getElementById('interest').focus();
  });
})();
