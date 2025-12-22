const contenedorSearch = document.getElementById("productos2");
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
    contenedorSearch.innerHTML = "<p>Error cargando productos</p>";
  });

  