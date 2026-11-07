const grid = document.querySelector("#product-grid");
const carousel = document.querySelector("#product-carousel");
const filters = document.querySelectorAll(".filter");
const count = document.querySelector("#carousel-count");
function whatsappLink(message) { return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`; }
function renderProducts(filter = "Todas") {
  const visible = filter === "Todas" ? products : products.filter(p => p.category === filter);
  grid.innerHTML = visible.map(product => `
    <article class="product-card">
      <div class="product-image catalog-placeholder" style="background-image: url('${product.img}');"> <span class="placeholder-category">${product.category}</span> <span class="placeholder-title">${product.name}</span><a class="source-link" href="${product.sourceUrl}" target="_blank" rel="noopener"> VER FOTO ORIGINAL ↗</a></div>
      <div class="product-info"><div class="product-meta"><span>${product.category}</span><span>✳ Diseño disponible para consulta</span></div><h3>${product.name}</h3><p>${product.description}</p><a class="product-link" href="${whatsappLink(`Hola, quiero información sobre el diseño ${product.name}. ¿Me comparten precio, tamaños y disponibilidad?`)}" target="_blank" rel="noopener">CONSULTAR POR WHATSAPP ↗</a></div>
    </article>`).join("");
  count.textContent = `${visible.length} ${visible.length === 1 ? "colección" : "colecciones"}`;
  carousel.scrollTo({ left: 0, behavior: "smooth" });
  startAutoAdvance();
}
filters.forEach(button => button.addEventListener("click", () => { filters.forEach(item => item.classList.remove("active")); button.classList.add("active"); renderProducts(button.dataset.filter); }));
const previousButton = document.querySelector("#carousel-prev");
const nextButton = document.querySelector("#carousel-next");
const toggleButton = document.querySelector("#carousel-toggle");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let autoAdvanceTimer = null;
let isPaused = prefersReducedMotion.matches;
let pauseOnInteraction = false;

function cardStep() {
  const card = grid.querySelector(".product-card");
  if (!card) return carousel.clientWidth * .8;
  const styles = getComputedStyle(grid);
  return card.getBoundingClientRect().width + (parseFloat(styles.columnGap || styles.gap) || 0);
}
function updateToggle() {
  toggleButton.textContent = isPaused ? "▶" : "Ⅱ";
  toggleButton.setAttribute("aria-label", isPaused ? "Reanudar avance automático" : "Pausar avance automático");
  toggleButton.setAttribute("aria-pressed", String(isPaused));
}
function stopAutoAdvance() {
  if (autoAdvanceTimer) window.clearInterval(autoAdvanceTimer);
  autoAdvanceTimer = null;
}
function startAutoAdvance() {
  stopAutoAdvance();
  if (isPaused || prefersReducedMotion.matches || products.length < 2) return;
  autoAdvanceTimer = window.setInterval(() => {
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    if (carousel.scrollLeft >= maxScroll - 8) {
      carousel.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      carousel.scrollBy({ left: cardStep(), behavior: "smooth" });
    }
  }, 5000);
}
function pauseForInteraction() {
  pauseOnInteraction = true;
  stopAutoAdvance();
  window.clearTimeout(resumeTimer);
  resumeTimer = window.setTimeout(() => {
    pauseOnInteraction = false;
    startAutoAdvance();
  }, 8000);
}
let resumeTimer = null;
previousButton.addEventListener("click", () => { pauseForInteraction(); carousel.scrollBy({ left: -cardStep(), behavior: "smooth" }); });
nextButton.addEventListener("click", () => { pauseForInteraction(); carousel.scrollBy({ left: cardStep(), behavior: "smooth" }); });
toggleButton.addEventListener("click", () => {
  isPaused = !isPaused;
  pauseOnInteraction = false;
  window.clearTimeout(resumeTimer);
  updateToggle();
  startAutoAdvance();
});
carousel.addEventListener("mouseenter", stopAutoAdvance);
carousel.addEventListener("mouseleave", startAutoAdvance);
carousel.addEventListener("focusin", stopAutoAdvance);
carousel.addEventListener("focusout", startAutoAdvance);
carousel.addEventListener("touchstart", stopAutoAdvance, { passive: true });
carousel.addEventListener("touchend", () => { if (!isPaused) { window.clearTimeout(resumeTimer); resumeTimer = window.setTimeout(startAutoAdvance, 2500); } }, { passive: true });
prefersReducedMotion.addEventListener?.("change", event => { if (event.matches) { isPaused = true; updateToggle(); } else { isPaused = false; updateToggle(); startAutoAdvance(); } });
updateToggle();
const generalMessage = "Hola, vi su catálogo de velas y quisiera conocer los diseños disponibles y hacer un pedido.";
["general-whatsapp", "floating-whatsapp"].forEach(id => { const el = document.getElementById(id); if (el) el.href = whatsappLink(generalMessage); });
const menuToggle = document.querySelector(".menu-toggle"); const nav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => { const isOpen = nav.classList.toggle("open"); menuToggle.setAttribute("aria-expanded", String(isOpen)); });
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => { nav.classList.remove("open"); menuToggle.setAttribute("aria-expanded", "false"); }));
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
startAutoAdvance();
