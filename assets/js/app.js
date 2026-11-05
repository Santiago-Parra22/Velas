const grid = document.querySelector("#product-grid");
const filters = document.querySelectorAll(".filter");
const categoryTrack = document.querySelector("#category-track");
function whatsappLink(message) { return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`; }
function renderProducts(filter = "Todas") {
  const visible = filter === "Todas" ? products : products.filter(p => p.category === filter);
  grid.innerHTML = visible.map(product => `
    <article class="product-card">
      <div class="product-image catalog-placeholder"><span class="placeholder-mark">✳</span><span class="placeholder-category">${product.category}</span><span class="placeholder-title">${product.name}</span><a class="source-link" href="${product.sourceUrl}" target="_blank" rel="noopener">VER FOTO ORIGINAL ↗</a></div>
      <div class="product-info"><div class="product-meta"><span>${product.category}</span><span>✳ Diseño disponible para consulta</span></div><h3>${product.name}</h3><p>${product.description}</p><a class="product-link" href="${whatsappLink(`Hola, quiero información sobre el diseño ${product.name}. ¿Me comparten precio, tamaños y disponibilidad?`)}" target="_blank" rel="noopener">CONSULTAR POR WHATSAPP ↗</a></div>
    </article>`).join("");
}
filters.forEach(button => button.addEventListener("click", () => {
  filters.forEach(item => item.classList.remove("active"));
  button.classList.add("active");
  renderProducts(button.dataset.filter);
}));
document.querySelectorAll(".carousel-arrow").forEach(button => button.addEventListener("click", () => {
  const direction = button.dataset.direction === "next" ? 1 : -1;
  categoryTrack.scrollBy({ left: direction * Math.max(220, categoryTrack.clientWidth * 0.72), behavior: "smooth" });
}));
const generalMessage = "Hola, vi su catálogo de velas y quisiera conocer los diseños disponibles y hacer un pedido.";
["general-whatsapp", "floating-whatsapp"].forEach(id => { const el = document.getElementById(id); if (el) el.href = whatsappLink(generalMessage); });
const menuToggle = document.querySelector(".menu-toggle"); const nav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => { const isOpen = nav.classList.toggle("open"); menuToggle.setAttribute("aria-expanded", String(isOpen)); });
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => { nav.classList.remove("open"); menuToggle.setAttribute("aria-expanded", "false"); }));
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
