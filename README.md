# Catálogo de velas navideñas — LUMÉ (nombre provisional)

Sitio estático en HTML, CSS y JavaScript. Preparado para publicar en Cloudflare Pages.

## Antes de publicar

1. **Nombre de marca:** busca `LUMÉ` en `index.html` y reemplázalo por el nombre definitivo.
2. **WhatsApp:** abre `assets/js/products.js` y cambia `WHATSAPP_NUMBER` por el número real. Usa solo números y código de país. Para Colombia: `57` + celular, sin `+`, espacios ni guiones.
3. **Productos:** edita el arreglo `products` en `assets/js/products.js`.
4. **Fotografías:** agrega tus fotos en `assets/img/` y cambia las rutas `image` de cada producto. Recomendación: fotos verticales o cuadradas, bien iluminadas, fondo limpio y archivos comprimidos en JPG/WebP.
5. **Textos:** actualiza la historia y promesas de marca en `index.html` cuando tengas la información real.

## Ejecutar localmente

Abre `index.html` en el navegador. Para una experiencia más fiel, también puedes usar la extensión Live Server de VS Code.

## Publicar en Cloudflare Pages

- Conecta el repositorio de GitHub en **Workers & Pages → Create application → Pages → Connect to Git**.
- Framework preset: `None`.
- Build command: vacío o `exit 0`.
- Build output directory: `.` (directorio raíz del proyecto).
- Root directory: `/` o vacío (raíz del repositorio).
- Despliega. El archivo `index.html` debe quedar en la raíz publicada.

## Estructura

- `index.html`: contenido y secciones.
- `assets/css/styles.css`: diseño adaptable.
- `assets/js/products.js`: catálogo y configuración de WhatsApp.
- `assets/js/app.js`: renderizado, filtros y enlaces.
- `assets/img/`: imágenes de productos y recursos gráficos.

Los productos e imágenes incluidos son demostrativos. Sustitúyelos por fotografías e información reales antes de compartir el QR.


## Catálogo completo VELAS 2026

Se incorporaron las 38 fichas identificadas en la carpeta OneDrive `VELAS 2026`, organizadas por categorías. Cada ficha incluye un enlace para abrir su fotografía original en OneDrive y un botón de consulta por WhatsApp.

**Importante:** por ahora las fotos no están copiadas dentro del proyecto; las tarjetas muestran una portada tipográfica y enlazan a la imagen original. Para que las fotografías se vean directamente dentro de la web, descarga las imágenes desde OneDrive y colócalas en `assets/img/catalogo/`; luego se actualizan las rutas en `assets/js/products.js`.

Antes de publicar, reemplaza `WHATSAPP_NUMBER` en `assets/js/products.js` por el número real (código de país + número, solo dígitos). También confirma precios y disponibilidad por WhatsApp: no se inventaron valores.
