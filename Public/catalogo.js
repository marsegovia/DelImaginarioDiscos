const contenedor = document.getElementById("productos2");
const search = document.getElementById("search");

let productos = [];

fetch("https://delimaginariodiscos.onrender.com/products")
  .then(res => res.json())
  .then(data => {
    productos = data;
    renderProductos(productos);
  })
  .catch(err => {
    console.error(err);
    contenedor.innerHTML = "<p>Error cargando productos</p>";
  });

// 2️⃣ Renderizar cards
function renderProductos(lista) {
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron productos</p>";
    return;
  }

  lista.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("producto");

    div.innerHTML = `
      <img src="${p.Imagen}" alt="${p.banda} - ${p.album}">
      <h3>${p.banda} - ${p.album}</h3>
      <p>$${p.precio}</p>
      <button class="ver-mas" data-id="${p.id}">Ver más</button>
    `;

    div.querySelector(".ver-mas").addEventListener("click", () => {
      window.location.href = `producto.html?id=${p.id}`;
    });

    contenedor.appendChild(div);
  });
}

// 3️⃣ Buscador del catálogo
if (search) {
  search.addEventListener("input", function (e) {
    const value = e.target.value.toLowerCase();

    const filtrados = productos.filter(function (p) {
      const texto =
        (p.banda || "") + " " +
        (p.album || "") + " " +
        (p.estilo || "");

      return texto.toLowerCase().includes(value);
    });

    renderProductos(filtrados);
  });
}