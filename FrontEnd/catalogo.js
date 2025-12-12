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
      `;

      contenedor.appendChild(div);
    });
  })
  .catch(err => {
    console.error(err);
    contenedor.innerHTML = "<p>Error cargando productos</p>";
  });
