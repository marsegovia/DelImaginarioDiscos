document.addEventListener("DOMContentLoaded", () => {
  console.log("admin-products cargado");

  const tbody = document.getElementById("productsBody");
  const search = document.getElementById("search");

  async function cargarProductosAdmin() {
    try {
      const res = await fetch("https://delimaginariodiscos.onrender.com/products");
      const data = await res.json();

      tbody.innerHTML = "";

      data.forEach(p => {
        const tr = document.createElement("tr");

        tr.innerHTML =
  '<td><img src="' + p.Imagen + '" width="50"></td>' +
  '<td>' + p.banda + '</td>' +
  '<td>' + p.album + '</td>' +
  '<td>$' + p.precio + '</td>' +
  '<td>' + (p.stock ?? '-') + '</td>' +
  '<td>' +
    '<button class="btn-edit" data-id="' + p.id + '">Editar</button>' +
    '<button class="btn-delete" data-id="' + p.id + '">Borrar</button>' +
  '</td>';


        tbody.appendChild(tr);
      });

    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  }

  cargarProductosAdmin();

  if (search) {
    search.addEventListener("input", e => {
      const value = e.target.value.toLowerCase();

      document.querySelectorAll("#productsBody tr").forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(value)
          ? ""
          : "none";
      });
    });
  }
});
