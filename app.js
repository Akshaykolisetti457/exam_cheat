// ── SEARCH FILTER ──────────────────────────────────────────────────────────

const searchInput = document.getElementById('searchInput');
const cards       = document.querySelectorAll('.pdf-card');
const emptyState  = document.getElementById('emptyState');
const grid        = document.getElementById('pdfGrid');

function filterCards() {
  const query    = searchInput.value.trim().toLowerCase();
  const activeTab = document.querySelector('.tab.active').dataset.filter;

  let visible = 0;

  cards.forEach(card => {
    const title    = card.querySelector('.card-title').textContent.toLowerCase();
    const meta     = card.querySelector('.card-meta').textContent.toLowerCase();
    const category = card.dataset.category;

    const matchesSearch = !query || title.includes(query) || meta.includes(query);
    const matchesTab    = activeTab === 'all' || category === activeTab;

    if (matchesSearch && matchesTab) {
      card.classList.remove('hidden');
      visible++;
    } else {
      card.classList.add('hidden');
    }
  });

  emptyState.style.display = visible === 0 ? 'block' : 'none';
}

searchInput.addEventListener('input', filterCards);

// ── TAB FILTER ─────────────────────────────────────────────────────────────

const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    filterCards();
  });
});

// ── CARD ENTRANCE ANIMATION ────────────────────────────────────────────────

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = `${i * 60}ms`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(24px)';
  card.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  observer.observe(card);
});

// Trigger initial animation
setTimeout(() => {
  cards.forEach((card, i) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 80);
  });
}, 100);
