const contenedor = document.getElementById("productos2");

fetch("http://localhost:3000/products")
  .then(res => res.json())
  .then(data => {
    contenedor.innerHTML = "";

    data.forEach(p => {
      const div = document.createElement("div");
      div.classList.add("producto");

      div.innerHTML = `
        <img src="${p.Imagen}" alt="${p.banda} - ${p.album}">
        <h3>${p.banda} - ${p.album}</h3>
        <p>$${p.precio}</p>

        <button class="ver-mas" data-id="${p.id}">
          Ver más
        </button>

      `;

      contenedor.appendChild(div);
      
    });
   // activar botones
    document.querySelectorAll(".ver-mas").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        window.location.href = `producto.html?id=${id}`;
      });
    });
  })
  .catch(err => {
    console.error(err);
    contenedor.innerHTML = "<p>Error cargando productos</p>";
  });
