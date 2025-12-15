document.addEventListener("DOMContentLoaded", () => {
  console.log("admin-bar.js cargado");

  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const adminBar = document.getElementById("admin-bar");

  // Mostrar barra de admin si es admin
  if (isAdmin && adminBar) adminBar.style.display = "flex";

  // Función para cargar productos en la tabla
  async function cargarProductosAdmin() {
    const tbody = document.getElementById("productsBody");
    if (!tbody) return;

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

      // Reagregar listener del buscador cada vez que se cargan los productos
      const search = document.getElementById("search");
      if (search) {
        search.addEventListener("input", e => {
          const value = e.target.value.toLowerCase();
          document.querySelectorAll("#productsBody tr").forEach(row => {
            row.style.display = row.innerText.toLowerCase().includes(value) ? "" : "none";
          });
        });
      }

    } catch (err) {
      console.error("Error cargando productos:", err);
    }
  }

  // Manejo de botones del nav admin
  document.querySelectorAll("#admin-bar button[data-view]").forEach(btn => {
    btn.addEventListener("click", () => {
      console.log("Botón clickeado:", btn.dataset.view);

      // Ocultar todas las secciones admin
      document.querySelectorAll(".admin-view").forEach(v => v.style.display = "none");

      // Mostrar la sección seleccionada
      const viewEl = document.getElementById("admin-" + btn.dataset.view);
      console.log("Sección a mostrar:", viewEl);
      if (viewEl) viewEl.style.display = "block";

      // Si es lista de productos, recargar tabla
      if (btn.dataset.view === "list") cargarProductosAdmin();
    });
  });

  // Logout
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("adminToken");
      window.location.href = "/index.html";
    });
  }

  // Formulario agregar producto
  const form = document.getElementById("formProducto");
  const msg = document.getElementById("admin-msg");

  if (form && msg) {
    form.addEventListener("submit", async e => {
      e.preventDefault();
      console.log("🟢 SUBMIT OK");
      msg.textContent = "Guardando producto...";

      const formData = new FormData(form);

      // Normalizar texto
      ["banda","album","pais","estilo","sello"].forEach(campo => {
        const val = formData.get(campo);
        if (val) formData.set(campo, val.charAt(0).toUpperCase() + val.slice(1));
      });

      try {
        const token = localStorage.getItem("adminToken");
        if (!token) throw new Error("No token");

        const res = await fetch("https://delimaginariodiscos.onrender.com/products/create", {
          method: "POST",
          headers: { "Authorization": "Bearer " + token },
          body: formData
        });

        const data = await res.json();
        console.log("🟣 STATUS:", res.status, data);

        if (!res.ok) throw new Error(data.error || "Error al crear producto");

        msg.textContent = "✅ Producto agregado correctamente";
        form.reset();
      } catch(err) {
        console.error(err);
        msg.textContent = "❌ " + err.message;
      }
    });
  }

  // Cargar productos al iniciar si estamos en la sección lista
  if (document.getElementById("admin-list")) cargarProductosAdmin();
});
