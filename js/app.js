// =====================================================
//  MiStream — Lógica principal
//  ⚠️  NO necesitas modificar este archivo.
//      Para agregar videos edita solo: videos.js
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

    // ── Estado ─────────────────────────────────────
    let categoriaActiva = "Todos";

    // ── Construir filtros dinámicamente ────────────
    function buildFilters() {
        const cats = ["Todos", ...new Set(videos.map(v => v.categoria))];

        cats.forEach(cat => {
            const btn = document.createElement("button");
            btn.className = "filter-btn" + (cat === "Todos" ? " active" : "");
            btn.textContent = cat;
            btn.dataset.cat = cat;
            btn.addEventListener("click", () => setCategoria(cat));
            filterBar.appendChild(btn);
        });
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
    }

    // ── Renderizar tarjetas ────────────────────────
    function renderGrid() {
        grid.innerHTML = "";

        const filtrados = categoriaActiva === "Todos"
            ? videos
            : videos.filter(v => v.categoria === categoriaActiva);

        if (filtrados.length === 0) {
            grid.innerHTML = `<p class="empty-msg">No hay videos en esta categoría todavía.</p>`;
            return;
        }

        filtrados.forEach(video => {
            const card = document.createElement("div");
            card.className = "video-card";

            const thumbHTML = video.thumb
                ? `<img src="${video.thumb}" alt="${video.titulo}" loading="lazy">`
                : `<div class="thumb-fallback">
                       <span class="icon">${iconoPorCategoria(video.categoria)}</span>
                       <span>${video.titulo}</span>
                   </div>`;

            card.innerHTML = `
                <div class="video-thumbnail">
                    ${thumbHTML}
                    <span class="badge">${video.categoria}</span>
                    <span class="play-icon">▶</span>
                </div>
                <div class="video-info">
                    <h3>${video.titulo}</h3>
                    <p>⏱ ${video.duracion}</p>
                </div>
            `;

            card.addEventListener("click", () => openModal(video));
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

    // ── Modal ──────────────────────────────────────
    function openModal(video) {
        iframe.src    = `https://drive.google.com/file/d/${video.driveId}/preview`;
        titleEl.textContent = video.titulo;
        durEl.textContent   = video.duracion;
        badgeEl.textContent = video.categoria;
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
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

})();
