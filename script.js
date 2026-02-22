const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const bagButton = document.getElementById('bagBtn');
const bagPanel = document.getElementById('bagPanel');
const closeBag = document.getElementById('closeBag');
const bagItems = document.getElementById('bagItems');
const bagEmpty = document.getElementById('bagEmpty');
const bagCount = document.getElementById('bagCount');
const addButtons = document.querySelectorAll('[data-add]');

let bag = [];

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open');
  });
}

function renderBag() {
  if (!bagItems || !bagEmpty || !bagCount) return;
  bagItems.innerHTML = '';
  bag.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    bagItems.appendChild(li);
  });
  bagCount.textContent = String(bag.length);
  bagEmpty.style.display = bag.length ? 'none' : 'block';
}

addButtons.forEach((button) => {
  button.addEventListener('click', () => {
    bag.push(button.dataset.add || 'Fragrance');
    renderBag();
    bagPanel?.classList.add('open');
    bagButton?.setAttribute('aria-expanded', 'true');
  });
});

bagButton?.addEventListener('click', () => {
  const open = bagPanel?.classList.toggle('open');
  bagButton.setAttribute('aria-expanded', String(open));
});
closeBag?.addEventListener('click', () => {
  bagPanel?.classList.remove('open');
  bagButton?.setAttribute('aria-expanded', 'false');
});

const finderForm = document.getElementById('finderForm');
const finderResult = document.getElementById('finderResult');
finderForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const mood = document.getElementById('mood')?.value;
  const note = document.getElementById('note')?.value;
  if (!finderResult) return;
  if (mood === 'bold' || note === 'wood') finderResult.textContent = 'Recommended: NOIR VETIVER';
  else if (mood === 'clean' || note === 'citrus') finderResult.textContent = 'Recommended: BLANCHE FIGUE';
  else finderResult.textContent = 'Recommended: AMBRE SÉRÉNITÉ';
});

const quotes = [
  ['“Noir Vetiver feels tailored—sharp lines, soft finish, unforgettable.”', '— Sofia, Milan'],
  ['“Blanche Figue is luminous and clean, with an addictive dry down.”', '— Hana, Tokyo'],
  ['“Ambre Sérénité wears like silk and candlelight.”', '— Camille, Paris']
];
let quoteIndex = 0;
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const prevQuote = document.getElementById('prevQuote');
const nextQuote = document.getElementById('nextQuote');

function renderQuote() {
  if (!quoteText || !quoteAuthor) return;
  quoteText.textContent = quotes[quoteIndex][0];
  quoteAuthor.textContent = quotes[quoteIndex][1];
}

prevQuote?.addEventListener('click', () => {
  quoteIndex = (quoteIndex - 1 + quotes.length) % quotes.length;
  renderQuote();
});
nextQuote?.addEventListener('click', () => {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  renderQuote();
});

const newsletterForm = document.getElementById('newsletterForm');
const newsletterResult = document.getElementById('newsletterResult');
newsletterForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email')?.value || '';
  if (!newsletterResult) return;
  newsletterResult.textContent = String(email).includes('@')
    ? 'Welcome to the Maison. Your subscription is confirmed.'
    : 'Please enter a valid email address.';
});

const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if (!toTop) return;
  toTop.classList.toggle('show', window.scrollY > 420);
});
toTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

renderBag();
renderQuote();
