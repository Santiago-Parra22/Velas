
const catalog = document.querySelector("#catalogo");

function renderProducts() {
    catalog.innerHTML = `
        <div class="max-w-7xl mx-auto px-6 py-20">
            <div class="text-center mb-12">
                <p class="uppercase tracking-[0.3em] text-sm">
                    Nuestra colección
                </p>
                <h2 class="text-4xl mt-3">
                    Encuentra tu esencia
                </h2>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                ${products.map(product => `
                    <article class="product-card">
                        <img
                            src="${product.image}"
                            alt="${product.name}"
                            class="w-full aspect-square object-cover rounded-xl"
                        >

                        <div class="pt-4">
                            <h3 class="text-xl font-semibold">
                                ${product.name}
                            </h3>

                            <p class="text-sm my-2">
                                ${product.description}
                            </p>

                            <p class="font-semibold mb-4">
                                $${product.price.toLocaleString("es-CO")}
                            </p>

                            <button
                                onclick="contactWhatsApp('${product.name}')"
                                class="w-full bg-[#655044] text-white py-3 rounded-lg"
                            >
                                Consultar producto
                            </button>
                        </div>
                    </article>
                `).join("")}
            </div>
        </div>
    `;
}

function contactWhatsApp(productName) {
    const phone = "573001234567";

    const message = encodeURIComponent(
        `Hola, estoy interesado/a en la ${productName}. ¿Me puedes dar más información?`
    );

    window.open(
        `https://wa.me/${phone}?text=${message}`,
        "_blank"
    );
}

renderProducts();