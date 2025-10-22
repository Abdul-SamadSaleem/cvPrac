// prefer saved theme, otherwise follow system; default to light
const storageKey = 'cv-theme';
const html = document.documentElement;

function getPreferredTheme() {
  const saved = localStorage.getItem(storageKey);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function setTheme(theme, withFade = false) {
  if (withFade) {
    document.body.classList.add('theme-fade');
    // allow the css animation to run; remove the class afterward
    setTimeout(() => document.body.classList.remove('theme-fade'), 300);
  }
  html.setAttribute('data-bs-theme', theme);
  localStorage.setItem(storageKey, theme);
  // swap icon
  const icon = document.querySelector('#themeToggle i');
  if (icon) icon.className = theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon';
}

// init on load
setTheme(getPreferredTheme());

// watch system changes if user hasn’t manually chosen
const media = window.matchMedia('(prefers-color-scheme: dark)');
media.addEventListener?.('change', e => {
  const saved = localStorage.getItem(storageKey);
  if (!saved) setTheme(e.matches ? 'dark' : 'light');
});

// toggle button
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'light' ? 'dark' : 'light';
  setTheme(next, true);
});

// print button
const printBtn = document.getElementById('printBtn');
printBtn.addEventListener('click', () => window.print());

// back to top
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 200 ? 'block' : 'none';
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
