// ── LIVE SEARCH FILTER ──
function filterCards() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const cards = document.querySelectorAll('.vault-card');
  const activeCat = document.querySelector('.cat-btn.active').getAttribute('onclick');
  const currentCat = activeCat.includes("'all'") ? 'all' : activeCat.match(/'(\w+)'/)[1];

  let visibleCount = 0;

  cards.forEach(card => {
    const title = card.getAttribute('data-title') || '';
    const cat = card.getAttribute('data-category') || '';
    const matchesSearch = title.includes(query);
    const matchesCat = currentCat === 'all' || cat === currentCat;

    if (matchesSearch && matchesCat) {
      card.style.display = 'block';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  document.getElementById('noResults').style.display = visibleCount === 0 ? 'block' : 'none';
}

// ── CATEGORY FILTER ──
function filterByCategory(category, btn) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const cards = document.querySelectorAll('.vault-card');
  const query = document.getElementById('searchInput').value.toLowerCase();
  let visibleCount = 0;

  cards.forEach(card => {
    const cat = card.getAttribute('data-category');
    const title = card.getAttribute('data-title') || '';
    const matchesCat = category === 'all' || cat === category;
    const matchesSearch = title.includes(query);

    if (matchesCat && matchesSearch) {
      card.style.display = 'block';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  document.getElementById('noResults').style.display = visibleCount === 0 ? 'block' : 'none';
}

// ── DARK / LIGHT MODE TOGGLE ──
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const btn = document.getElementById('darkModeBtn');
  if (btn) {
    btn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  }
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Persist dark mode across pages
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
});