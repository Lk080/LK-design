// Navigation, automation examples and contact shortcuts.
const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
function closeMenu() {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Menu openen');
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  nav.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); }
});
document.addEventListener('click', event => {
  if (!nav.contains(event.target) && !menu.contains(event.target)) closeMenu();
});
matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
const examples={intake:['“Ik wil mijn badkamer renoveren.”','Een slim formulier vraagt naar de ruimte, timing en gewenste werken.','Van losse info naar een helder overzicht.','De antwoorden worden geordend in een bruikbare projectsamenvatting.','Jij start het gesprek met een voorsprong.','Minder heen-en-weer. Meteen de juiste vragen.'],vragen:['“Hoe verloopt een eerste afspraak?”','Een bezoeker stelt een vraag over jouw dienstverlening.','Een antwoord op basis van jouw informatie.','Een slimme assistent gebruikt jouw goedgekeurde uitleg en verwijst bij twijfel naar jou.','Je klant vindt sneller de juiste informatie.','Jij houdt meer ruimte voor vragen die je aandacht nodig hebben.'],opvolging:['Een nieuwe aanvraag komt binnen.','Een potentiële klant deelt contactgegevens en een concrete vraag.','Alle informatie op de juiste plek.','Een koppeling zet de aanvraag in je overzicht en maakt een conceptantwoord klaar.','Jij controleert en neemt persoonlijk contact op.','Geen losse aanvragen meer zoeken tussen verschillende tools.']};const keys=['flow-one','flow-one-text','flow-two','flow-two-text','flow-result','flow-result-text'];const tabs=[...document.querySelectorAll('[data-use]')];function activate(tab){tabs.forEach(t=>{t.setAttribute('aria-selected',String(t===tab));t.tabIndex=t===tab?0:-1});keys.forEach((key,i)=>document.getElementById(key).textContent=examples[tab.dataset.use][i]);document.getElementById('use-panel').setAttribute('aria-labelledby',tab.id)}tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>activate(tab));tab.addEventListener('keydown',e=>{let n;if(e.key==='ArrowDown'||e.key==='ArrowRight')n=(i+1)%tabs.length;if(e.key==='ArrowUp'||e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;if(e.key==='Home')n=0;if(e.key==='End')n=tabs.length-1;if(n!==undefined){e.preventDefault();activate(tabs[n]);tabs[n].focus()}})});
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('[data-interest],[data-package]').forEach(link => {
  link.addEventListener('click', () => {
    const form = document.getElementById('contact-form');
    if (form.getAttribute('aria-busy') === 'true') return;
    const label = link.dataset.package;
    const interest = link.dataset.interest || (label.includes('Onderhoud') ? 'Maandelijks onderhoud' : label.includes('maatwerk') ? 'AI en automatisering' : 'Een nieuwe website');
    document.getElementById('interest').value = interest;
    document.getElementById('selected-package').value = label || '';
    if (label) {
      const message = document.getElementById('message');
      if (!message.value.trim()) message.value = `Ik heb interesse in ${label}.`;
    }
    // A different shortcut replaces a previous configurator selection, not visitor text.
    document.getElementById('project-summary').value = '';
    document.getElementById('request-plan').hidden = true;
    form.dispatchEvent(new Event('input', { bubbles: true }));
  });
});
