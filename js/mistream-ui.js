/* =====================================================
   mistream-ui.js — Búsqueda + animaciones visuales
   No modifica la lógica de app.js ni videos.js
   ===================================================== */

(function () {
    'use strict';

    /* ── Elementos ── */
    const searchInput  = document.getElementById('searchInput');
    const searchClear  = document.getElementById('searchClear');
    const searchCount  = document.getElementById('searchCount');
    const searchEmpty  = document.getElementById('searchEmpty');
    const searchEmptyQ = document.getElementById('searchEmptyQuery');
    const videoGrid    = document.getElementById('videoGrid');
    const header       = document.querySelector('.header');

    if (!searchInput || !videoGrid) return;

    /* ══════════════════════════════════════
       1. HEADER: encoge al hacer scroll
    ══════════════════════════════════════ */
    const onScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ══════════════════════════════════════
       2. BÚSQUEDA en tiempo real
    ══════════════════════════════════════ */
    let debounceTimer;

    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(runSearch, 120);
    });

    /* Limpiar con el botón ✕ */
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
        runSearch();
    });

    /* Limpiar con Escape */
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            runSearch();
            searchInput.blur();
        }
    });

    function runSearch() {
        const query = searchInput.value.trim().toLowerCase();

        /* Botón limpiar */
        searchClear.classList.toggle('visible', query.length > 0);

        /* Obtener todas las cards (las que el app.js no oculta por categoría) */
        const allCards = Array.from(videoGrid.querySelectorAll('.video-card'));

        /* Filtrar por búsqueda */
        let visibleCount = 0;

        allCards.forEach(card => {
            /* Respetamos la visibilidad de categoría que maneja app.js */
            const hiddenByCategory = card.style.display === 'none';

            if (hiddenByCategory) {
                card.classList.remove('search-hidden');
                return;
            }

            if (!query) {
                /* Sin query: mostrar todo lo que no esté oculto por categoría */
                if (card.classList.contains('search-hidden')) {
                    card.classList.remove('search-hidden');
                    animateIn(card);
                }
                visibleCount++;
                return;
            }

            const title = (card.querySelector('h3')?.textContent || '').toLowerCase();
            const matches = title.includes(query);

            if (matches) {
                if (card.classList.contains('search-hidden')) {
                    card.classList.remove('search-hidden');
                    animateIn(card);
                }
                visibleCount++;
            } else {
                if (!card.classList.contains('search-hidden')) {
                    animateOut(card, () => card.classList.add('search-hidden'));
                }
            }
        });

        /* Contador */
        if (query) {
            searchCount.innerHTML = `<strong>${visibleCount}</strong> resultado${visibleCount !== 1 ? 's' : ''}`;
            searchCount.classList.add('visible');
        } else {
            searchCount.classList.remove('visible');
        }

        /* Estado vacío */
        const showEmpty = query && visibleCount === 0;
        searchEmpty.classList.toggle('visible', showEmpty);
        if (showEmpty) {
            searchEmptyQ.textContent = searchInput.value.trim();
        }
    }

    /* ── Animaciones de cards ── */
    function animateIn(card) {
        card.classList.remove('filter-out');
        card.classList.add('filter-in');
        card.addEventListener('animationend', () => card.classList.remove('filter-in'), { once: true });
    }

    function animateOut(card, callback) {
        card.classList.add('filter-out');
        card.addEventListener('animationend', () => {
            card.classList.remove('filter-out');
            if (callback) callback();
        }, { once: true });
    }

    /* ══════════════════════════════════════
       3. Resincronizar búsqueda cuando app.js
          cambia el filtro de categoría
          (observa cambios en el grid)
    ══════════════════════════════════════ */
    const observer = new MutationObserver(() => {
        if (searchInput.value.trim()) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(runSearch, 80);
        }
    });

    observer.observe(videoGrid, {
        childList: true,
        subtree: false,
        attributes: true,
        attributeFilter: ['style'],
        attributeOldValue: false,
    });

    /* Observar cambios de estilo en cards hijas también */
    const childObserver = new MutationObserver(() => {
        if (searchInput.value.trim()) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(runSearch, 80);
        }
    });

    /* Observar cuando se añaden cards nuevas */
    new MutationObserver((mutations) => {
        mutations.forEach(m => {
            m.addedNodes.forEach(node => {
                if (node.classList?.contains('video-card')) {
                    childObserver.observe(node, { attributes: true, attributeFilter: ['style'] });
                }
            });
        });
    }).observe(videoGrid, { childList: true });

})();
