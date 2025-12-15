const contenedor = document.getElementById("producto-detalle");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://delimaginariodiscos.onrender.com/products/${id}`)
  .then(res => res.json())
  .then(p => {
    contenedor.innerHTML = `
      <div class="producto-card">
        <img src="${p.Imagen}" class="producto-img-grande">

        <div class="producto-info">
          <h1>${p.banda} – ${p.album}</h1>
          <h2>$${p.precio}</h2>
          <p><strong>Estilo:</strong> ${p.estilo || "No especificado"}</p>
          <p><strong>País:</strong> ${p.pais || "No especificado"}</p>
          <p><strong>Sello:</strong> ${p.sello || "No especificado"}</p>

        </div>
      </div>
    `;
  })
  .catch(err => {
    console.error(err);
    contenedor.innerHTML = "<p>Error cargando producto</p>";
  });
