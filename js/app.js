// =====================================================
//  MiStream — Lógica principal con favoritos, watch later y recientes
//  Editar solo videos.js para añadir contenido
// =====================================================

(function () {

    // ── Elementos del DOM ──────────────────────────
    const grid      = document.getElementById("videoGrid");
    const modal     = document.getElementById("playerModal");
    const iframe    = document.getElementById("driveIframe");
    const titleEl   = document.getElementById("modalTitle");
    const durEl     = document.getElementById("modalDuration");
    const badgeEl   = document.getElementById("modalBadge");
    const closeBtn  = document.getElementById("closeBtn");
    const navLinks  = document.querySelectorAll("nav a[data-cat]");
    const filterBar = document.getElementById("filterBar");
    const recentSection = document.getElementById("recentSection");
    const recentGrid    = document.getElementById("recentGrid");

    // ── Estado ─────────────────────────────────────
    let categoriaActiva = "Todos";

    // ── LocalStorage ───────────────────────────────
    let favorites   = JSON.parse(localStorage.getItem('mistream_favorites') || '[]');
    let watchLater  = JSON.parse(localStorage.getItem('mistream_watchlater') || '[]');
    let recent      = JSON.parse(localStorage.getItem('mistream_recent') || '[]');

    // ── Funciones auxiliares ──────────────────────
    function saveFavorites() {
        localStorage.setItem('mistream_favorites', JSON.stringify(favorites));
    }
    function saveWatchLater() {
        localStorage.setItem('mistream_watchlater', JSON.stringify(watchLater));
    }
    function saveRecent() {
        localStorage.setItem('mistream_recent', JSON.stringify(recent));
    }

    function isFavorite(driveId) {
        return favorites.includes(driveId);
    }
    function isWatchLater(driveId) {
        return watchLater.includes(driveId);
    }

    function toggleFavorite(driveId) {
        const index = favorites.indexOf(driveId);
        if (index === -1) favorites.push(driveId);
        else favorites.splice(index, 1);
        saveFavorites();
        renderGrid(); // refrescar para mostrar cambio de estado
    }

    function toggleWatchLater(driveId) {
        const index = watchLater.indexOf(driveId);
        if (index === -1) watchLater.push(driveId);
        else watchLater.splice(index, 1);
        saveWatchLater();
        renderGrid();
    }

    function addToRecent(video) {
        // Evitar duplicados
        recent = recent.filter(v => v.driveId !== video.driveId);
        recent.unshift(video);
        if (recent.length > 10) recent.pop();
        saveRecent();
        renderRecentSection();
    }

    // ── Renderizar sección "Vistos recientemente" ──
    function renderRecentSection() {
        if (!recentSection) return;

        // Solo mostrar si la categoría activa es "Todos" y hay recientes
        if (categoriaActiva === "Todos" && recent.length > 0) {
            recentSection.style.display = "block";
            recentGrid.innerHTML = "";
            recent.slice(0, 5).forEach(video => {
                const card = document.createElement("div");
                card.className = "recent-card";
                const thumbStyle = video.thumb
                    ? `background-image: url('${video.thumb}');`
                    : `background: var(--bg-elevated);`;
                card.innerHTML = `
                    <div class="recent-thumb" style="${thumbStyle} background-size: cover; background-position: center;">
                        <span class="play-icon">▶</span>
                    </div>
                    <div class="recent-info">
                        <h4>${video.titulo}</h4>
                        <p>${video.duracion}</p>
                    </div>
                `;
                card.addEventListener("click", () => openModal(video));
                recentGrid.appendChild(card);
            });
        } else {
            recentSection.style.display = "none";
        }
    }

    // ── Construir filtros (incluyendo Favoritos y Ver más tarde) ──
    function buildFilters() {
        // Limpiar para evitar duplicados al recargar
        filterBar.innerHTML = "";

        const cats = ["Todos", ...new Set(videos.map(v => v.categoria))];

        // Botones de categoría
        cats.forEach(cat => {
            const btn = document.createElement("button");
            btn.className = "filter-btn" + (cat === "Todos" ? " active" : "");
            btn.textContent = cat;
            btn.dataset.cat = cat;
            btn.addEventListener("click", () => setCategoria(cat));
            filterBar.appendChild(btn);
        });

        // Botón "Favoritos"
        const favBtn = document.createElement("button");
        favBtn.className = "filter-btn";
        favBtn.textContent = "⭐ Favoritos";
        favBtn.dataset.cat = "Favoritos";
        favBtn.addEventListener("click", () => setCategoria("Favoritos"));
        filterBar.appendChild(favBtn);

        // Botón "Ver más tarde"
        const laterBtn = document.createElement("button");
        laterBtn.className = "filter-btn";
        laterBtn.textContent = "⏱ Ver más tarde";
        laterBtn.dataset.cat = "WatchLater";
        laterBtn.addEventListener("click", () => setCategoria("WatchLater"));
        filterBar.appendChild(laterBtn);
    }

    // ── Cambiar categoría activa ───────────────────
    function setCategoria(cat) {
        categoriaActiva = cat;

        // Actualizar botones de filtro
        document.querySelectorAll(".filter-btn").forEach(b => {
            b.classList.toggle("active", b.dataset.cat === cat);
        });

        // Actualizar nav links si existen
        navLinks.forEach(a => {
            a.classList.toggle("active", a.dataset.cat === cat);
        });

        renderGrid();
        renderRecentSection(); // la sección de recientes se oculta si no es "Todos"
    }

    // ── Obtener lista de videos según la categoría activa ──
    function getFilteredVideos() {
        if (categoriaActiva === "Todos") return videos;
        if (categoriaActiva === "Favoritos") return videos.filter(v => favorites.includes(v.driveId));
        if (categoriaActiva === "WatchLater") return videos.filter(v => watchLater.includes(v.driveId));
        return videos.filter(v => v.categoria === categoriaActiva);
    }

    // ── Renderizar tarjetas ────────────────────────
    function renderGrid() {
        const filtered = getFilteredVideos();
        grid.innerHTML = "";

        if (filtered.length === 0) {
            grid.innerHTML = `<p class="empty-msg">No hay videos en esta categoría todavía.</p>`;
            return;
        }

        filtered.forEach(video => {
            const card = document.createElement("div");
            card.className = "video-card";

            const thumbHTML = video.thumb
                ? `<img src="${video.thumb}" alt="${video.titulo}" loading="lazy" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\'thumb-fallback\'><span class=\'icon\'>${iconoPorCategoria(video.categoria)}</span><span>${video.titulo}</span></div>';">`
                : `<div class="thumb-fallback">
                       <span class="icon">${iconoPorCategoria(video.categoria)}</span>
                       <span>${video.titulo}</span>
                   </div>`;

            // Botones de acción
            const favActive = isFavorite(video.driveId) ? "active" : "";
            const laterActive = isWatchLater(video.driveId) ? "active" : "";

            card.innerHTML = `
                <div class="video-thumbnail">
                    ${thumbHTML}
                    <span class="badge">${video.categoria}</span>
                    <span class="play-icon">▶</span>
                    <div class="card-actions">
                        <button class="action-btn fav-btn ${favActive}" data-id="${video.driveId}" data-action="fav">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </button>
                        <button class="action-btn later-btn ${laterActive}" data-id="${video.driveId}" data-action="later">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="video-info">
                    <h3>${video.titulo}</h3>
                    <p>⏱ ${video.duracion}</p>
                </div>
            `;

            // Evento para abrir modal al hacer clic en la tarjeta (no en botones)
            card.addEventListener("click", (e) => {
                // Evitar que el clic en botones dispare el modal
                if (e.target.closest('.action-btn')) return;
                openModal(video);
            });

            // Eventos para botones de acción
            const favBtn = card.querySelector('.fav-btn');
            const laterBtn = card.querySelector('.later-btn');

            favBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                toggleFavorite(video.driveId);
            });

            laterBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                toggleWatchLater(video.driveId);
            });

            grid.appendChild(card);
        });
    }

    // ── Ícono según categoría ──────────────────────
    function iconoPorCategoria(cat) {
        const iconos = {
            "Peliculas": "🎬",
            "Series":    "📺",
            "Otros":     "🎞️"
        };
        return iconos[cat] || "▶️";
    }

    // ── Modal con autoplay y registro en recientes ──
    function openModal(video) {
        iframe.src = `https://drive.google.com/file/d/${video.driveId}/preview`;
        titleEl.textContent = video.titulo;
        durEl.textContent   = video.duracion;
        badgeEl.textContent = video.categoria;
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
        // Guardar en vistos recientemente
        addToRecent(video);
    }

    function closeModal() {
        modal.classList.remove("open");
        iframe.src = "";
        document.body.style.overflow = "";
    }

    // ── Eventos del modal ──────────────────────────
    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

    // ── Nav links de cabecera ──────────────────────
    navLinks.forEach(a => {
        a.addEventListener("click", e => {
            e.preventDefault();
            setCategoria(a.dataset.cat);
        });
    });

    // ── Iniciar ────────────────────────────────────
    buildFilters();
    renderGrid();
    renderRecentSection();

})();