// =====================================================
//  MiStream — app.js
//  Soporta películas, series con episodios,
//  favoritos, ver más tarde y recientes.
//  Solo edita videos.js para añadir contenido.
// =====================================================

(function () {

    // ── DOM ────────────────────────────────────────
    const grid           = document.getElementById("videoGrid");
    const playerModal    = document.getElementById("playerModal");
    const episodesModal  = document.getElementById("episodesModal");
    const videoWrapper   = document.getElementById("videoWrapper");
    const titleEl        = document.getElementById("modalTitle");
    const durEl          = document.getElementById("modalDuration");
    const badgeEl        = document.getElementById("modalBadge");
    const closeBtn       = document.getElementById("closeBtn");
    const modalBackdrop  = document.getElementById("modalBackdrop");
    const navLinks       = document.querySelectorAll("nav a[data-cat]");
    const filterBar      = document.getElementById("filterBar");
    const recentSection  = document.getElementById("recentSection");
    const recentGrid     = document.getElementById("recentGrid");

    // Episodios modal
    const episodesBackdrop = document.getElementById("episodesBackdrop");
    const episodesCloseBtn = document.getElementById("episodesCloseBtn");
    const episodesTitle    = document.getElementById("episodesTitle");
    const episodesCount    = document.getElementById("episodesCount");
    const episodesThumb    = document.getElementById("episodesThumb");
    const episodesList     = document.getElementById("episodesList");

    // Navegación de episodios en el reproductor
    const epNav        = document.getElementById("epNav");
    const epPrevBtn    = document.getElementById("epPrevBtn");
    const epNextBtn    = document.getElementById("epNextBtn");
    const epNavCounter = document.getElementById("epNavCounter");

    // ── Estado ─────────────────────────────────────
    let categoriaActiva  = "Todos";
    let currentSerie     = null;  // serie activa mientras se reproduce
    let currentEpIndex   = -1;   // índice del episodio en reproducción

    // ── LocalStorage ───────────────────────────────
    let favorites  = JSON.parse(localStorage.getItem('mistream_favorites')  || '[]');
    let watchLater = JSON.parse(localStorage.getItem('mistream_watchlater') || '[]');
    let recent     = JSON.parse(localStorage.getItem('mistream_recent')     || '[]');

    function saveFavorites()  { localStorage.setItem('mistream_favorites',  JSON.stringify(favorites));  }
    function saveWatchLater() { localStorage.setItem('mistream_watchlater', JSON.stringify(watchLater)); }
    function saveRecent()     { localStorage.setItem('mistream_recent',     JSON.stringify(recent));     }

    // ── Helpers ────────────────────────────────────
    function isFavorite(id)   { return favorites.includes(id);  }
    function isWatchLater(id) { return watchLater.includes(id); }

    function toggleFavorite(id) {
        const i = favorites.indexOf(id);
        if (i === -1) favorites.push(id); else favorites.splice(i, 1);
        saveFavorites(); renderGrid();
    }
    function toggleWatchLater(id) {
        const i = watchLater.indexOf(id);
        if (i === -1) watchLater.push(id); else watchLater.splice(i, 1);
        saveWatchLater(); renderGrid();
    }

    function isSeries(v) { return Array.isArray(v.episodios) && v.episodios.length > 0; }
    function uid(v)      { return v.videoId || v.titulo; }

    // ── Recientes ──────────────────────────────────
    function addToRecent(video) {
        recent = recent.filter(r => (r.videoId || r.titulo) !== (video.videoId || video.titulo));
        recent.unshift(video);
        if (recent.length > 10) recent.pop();
        saveRecent();
        renderRecentSection();
    }

    function renderRecentSection() {
        if (!recentSection) return;
        if (categoriaActiva === "Todos" && recent.length > 0) {
            recentSection.style.display = "block";
            recentGrid.innerHTML = "";
            recent.slice(0, 5).forEach(video => {
                const card = document.createElement("div");
                card.className = "recent-card";
                const thumbStyle = video.thumb
                    ? `background-image:url('${video.thumb}');background-size:cover;background-position:center;`
                    : `background:var(--bg-elevated);`;
                card.innerHTML = `
                    <div class="recent-thumb" style="${thumbStyle}">
                        <span class="play-icon"></span>
                    </div>
                    <div class="recent-info">
                        <h4>${video.titulo}</h4>
                        <p>${isSeries(video) ? video.episodios.length + ' episodios' : video.duracion}</p>
                    </div>`;
                card.addEventListener("click", () => {
                    if (isSeries(video)) openEpisodesModal(video);
                    else openPlayerModal(video);
                });
                recentGrid.appendChild(card);
            });
        } else {
            recentSection.style.display = "none";
        }
    }

    // ── Filtros ────────────────────────────────────
    function buildFilters() {
        filterBar.innerHTML = "";
        const cats = ["Todos", ...new Set(videos.map(v => v.categoria))];

        cats.forEach(cat => {
            const btn = document.createElement("button");
            btn.className = "filter-btn" + (cat === "Todos" ? " active" : "");
            btn.textContent = cat;
            btn.dataset.cat = cat;
            btn.addEventListener("click", () => setCategoria(cat));
            filterBar.appendChild(btn);
        });

        const favBtn = document.createElement("button");
        favBtn.className = "filter-btn";
        favBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> Favoritos`;
        favBtn.dataset.cat = "Favoritos";
        favBtn.addEventListener("click", () => setCategoria("Favoritos"));
        filterBar.appendChild(favBtn);

        const laterBtn = document.createElement("button");
        laterBtn.className = "filter-btn";
        laterBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Ver más tarde`;
        laterBtn.dataset.cat = "WatchLater";
        laterBtn.addEventListener("click", () => setCategoria("WatchLater"));
        filterBar.appendChild(laterBtn);
    }

    function setCategoria(cat) {
        categoriaActiva = cat;
        document.querySelectorAll(".filter-btn").forEach(b =>
            b.classList.toggle("active", b.dataset.cat === cat));
        navLinks.forEach(a =>
            a.classList.toggle("active", a.dataset.cat === cat));
        renderGrid();
        renderRecentSection();
    }

    function getFilteredVideos() {
        if (categoriaActiva === "Todos")      return videos;
        if (categoriaActiva === "Favoritos")  return videos.filter(v => favorites.includes(uid(v)));
        if (categoriaActiva === "WatchLater") return videos.filter(v => watchLater.includes(uid(v)));
        return videos.filter(v => v.categoria === categoriaActiva);
    }

    // ── Grid ───────────────────────────────────────
    function iconoPorCategoria(cat) {
        return { Peliculas:"🎬", Series:"📺", Otros:"🎞️" }[cat] || "▶️";
    }

    function renderGrid() {
        const filtered = getFilteredVideos();
        grid.innerHTML = "";

        if (filtered.length === 0) {
            grid.innerHTML = `<p class="empty-msg">No hay videos en esta categoría todavía.</p>`;
            return;
        }

        filtered.forEach(video => {
            const card  = document.createElement("div");
            card.className = "video-card" + (isSeries(video) ? " is-series" : "");

            const esS = isSeries(video);
            const id  = uid(video);
            const favActive   = isFavorite(id)   ? "active" : "";
            const laterActive = isWatchLater(id) ? "active" : "";

            const thumbHTML = video.thumb
                ? `<img src="${video.thumb}" alt="${video.titulo}" loading="lazy"
                        onerror="this.onerror=null;this.parentElement.innerHTML='<div class=\'thumb-fallback\'><span class=\'icon\'>${iconoPorCategoria(video.categoria)}</span><span>${video.titulo}</span></div>';">`
                : `<div class="thumb-fallback">
                       <span class="icon">${iconoPorCategoria(video.categoria)}</span>
                       <span>${video.titulo}</span>
                   </div>`;

            const seriesIndicator = esS
                ? `<div class="series-indicator">
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                           <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                       </svg>
                       ${video.episodios.length} ep.
                   </div>`
                : "";

            card.innerHTML = `
                <div class="video-thumbnail">
                    ${thumbHTML}
                    <span class="badge">${video.categoria}</span>
                    ${seriesIndicator}
                    <div class="play-icon"></div>
                    <div class="card-actions">
                        <button class="action-btn fav-btn ${favActive}" data-id="${id}" title="Favorito">
                            <svg viewBox="0 0 24 24" fill="${favActive ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </button>
                        <button class="action-btn later-btn ${laterActive}" data-id="${id}" title="Ver más tarde">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="video-info">
                    <h3>${video.titulo}</h3>
                    <p>${esS ? `📺 ${video.episodios.length} episodios` : `⏱ ${video.duracion}`}</p>
                </div>`;

            card.addEventListener("click", (e) => {
                if (e.target.closest('.action-btn')) return;
                if (esS) openEpisodesModal(video);
                else openPlayerModal(video, null, -1);
            });

            card.querySelector('.fav-btn').addEventListener("click", e => {
                e.stopPropagation(); toggleFavorite(id);
            });
            card.querySelector('.later-btn').addEventListener("click", e => {
                e.stopPropagation(); toggleWatchLater(id);
            });

            grid.appendChild(card);
        });
    }

    // ── Modal episodios ────────────────────────────
    function openEpisodesModal(serie) {
        episodesTitle.textContent = serie.titulo;
        episodesCount.textContent = `${serie.episodios.length} episodio${serie.episodios.length !== 1 ? 's' : ''}`;

        if (serie.thumb) {
            episodesThumb.style.backgroundImage  = `url('${serie.thumb}')`;
            episodesThumb.style.backgroundSize   = "cover";
            episodesThumb.style.backgroundPosition = "center";
            episodesThumb.innerHTML = "";
        } else {
            episodesThumb.style.backgroundImage = "";
            episodesThumb.innerHTML = `<span style="font-size:2.5rem;opacity:.4;">📺</span>`;
        }

        episodesList.innerHTML = "";
        serie.episodios.forEach((ep, i) => {
            const item = document.createElement("div");
            item.className = "episode-item";
            const thumbStyle = ep.thumb
                ? `background-image:url('${ep.thumb}');background-size:cover;background-position:center;`
                : `background:var(--bg-elevated);`;
            item.innerHTML = `
                <div class="ep-num">${String(i + 1).padStart(2, '0')}</div>
                <div class="ep-thumb" style="${thumbStyle}">
                    ${!ep.thumb ? `<span style="opacity:.3;font-size:1.2rem;">▶</span>` : ''}
                </div>
                <div class="ep-info">
                    <span class="ep-title">${ep.titulo}</span>
                    <span class="ep-dur">${ep.duracion}</span>
                </div>
                <button class="ep-play-btn" aria-label="Reproducir episodio">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5,3 19,12 5,21"/>
                    </svg>
                </button>`;

            item.addEventListener("click", () => {
                closeEpisodesModal();
                setTimeout(() => openPlayerModal(ep, serie, i), 180);
            });

            episodesList.appendChild(item);
        });

        episodesModal.classList.add("open");
        document.body.style.overflow = "hidden";
        addToRecent(serie);
    }

    function closeEpisodesModal() {
        const content = episodesModal.querySelector('.episodes-content');
        content.classList.add('closing');
        content.addEventListener('animationend', () => {
            episodesModal.classList.remove("open");
            content.classList.remove('closing');
            document.body.style.overflow = "";
        }, { once: true });
    }

    episodesCloseBtn.addEventListener("click", closeEpisodesModal);
    episodesBackdrop.addEventListener("click", closeEpisodesModal);

    // ── Modal reproductor ──────────────────────────
    // serie = null para películas; epIndex = -1 para películas
    function openPlayerModal(video, serie, epIndex) {
        currentSerie   = serie   ?? null;
        currentEpIndex = epIndex ?? -1;

        loadEpisode(video);

        playerModal.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    // Carga el video en el iframe y actualiza textos + nav
    function loadEpisode(video) {
        const videoUrl = video.platform === "embed"
            ? video.videoId
            : `https://drive.google.com/file/d/${video.videoId}/preview`;

        videoWrapper.innerHTML = `
            <div class="player-container">
                <iframe src="${videoUrl}" allow="autoplay; fullscreen" allowfullscreen></iframe>
            </div>`;

        // Título: para series mostramos "Serie — Ep. X · Título episodio"
        if (currentSerie && currentEpIndex >= 0) {
            titleEl.textContent = video.titulo;
            durEl.textContent   = video.duracion;
            badgeEl.textContent = "Serie";
        } else {
            titleEl.textContent = video.titulo;
            durEl.textContent   = video.duracion;
            badgeEl.textContent = video.categoria;
        }

        updateEpNav();
    }

    // Actualiza visibilidad y estado de los botones prev/next
    function updateEpNav() {
        if (!currentSerie || currentEpIndex < 0) {
            epNav.classList.remove("visible");
            return;
        }

        epNav.classList.add("visible");

        const total = currentSerie.episodios.length;
        epNavCounter.textContent = `${currentEpIndex + 1} / ${total}`;

        epPrevBtn.disabled = currentEpIndex <= 0;
        epNextBtn.disabled = currentEpIndex >= total - 1;

        epPrevBtn.classList.toggle("disabled", epPrevBtn.disabled);
        epNextBtn.classList.toggle("disabled", epNextBtn.disabled);
    }

    function goToEpisode(newIndex) {
        if (!currentSerie) return;
        const ep = currentSerie.episodios[newIndex];
        if (!ep) return;

        currentEpIndex = newIndex;

        // Fade rápido para suavizar el cambio de iframe
        videoWrapper.style.opacity = "0";
        setTimeout(() => {
            loadEpisode(ep);
            videoWrapper.style.opacity = "1";
        }, 180);
    }

    epPrevBtn.addEventListener("click", () => goToEpisode(currentEpIndex - 1));
    epNextBtn.addEventListener("click", () => goToEpisode(currentEpIndex + 1));

    function closePlayerModal() {
        const content = playerModal.querySelector('.modal-content');
        content.classList.add('closing');
        content.addEventListener('animationend', () => {
            playerModal.classList.remove("open");
            content.classList.remove('closing');
            videoWrapper.innerHTML = "";
            videoWrapper.style.opacity = "1";
            currentSerie   = null;
            currentEpIndex = -1;
            epNav.classList.remove("visible");
            document.body.style.overflow = "";
        }, { once: true });
    }

    closeBtn.addEventListener("click", closePlayerModal);
    modalBackdrop.addEventListener("click", closePlayerModal);
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            if (playerModal.classList.contains("open"))   closePlayerModal();
            if (episodesModal.classList.contains("open")) closeEpisodesModal();
        }
    });

    // ── Nav ────────────────────────────────────────
    navLinks.forEach(a => {
        a.addEventListener("click", e => {
            e.preventDefault();
            setCategoria(a.dataset.cat);
        });
    });

    // ── Init ───────────────────────────────────────
    buildFilters();
    renderGrid();
    renderRecentSection();

})();