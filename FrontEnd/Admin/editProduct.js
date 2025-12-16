document.addEventListener("click", e => {
  if (e.target.classList.contains("btn-edit")) {
    const id = e.target.dataset.id;
    window.location.href = `/Admin/edit.html?id=${id}`;
  }
});


document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    alert("Producto inválido");
    return;
  }

  try {
    const res = await fetch(`https://delimaginariodiscos.onrender.com/products/${id}`);
    const product = await res.json();

    document.getElementById("banda").value = product.banda || "";
    document.getElementById("album").value = product.album || "";
    document.getElementById("pais").value = product.pais || "";
    document.getElementById("estilo").value = product.estilo || "";
    document.getElementById("sello").value = product.sello || "";
    document.getElementById("precio").value = product.precio || "";
    document.getElementById("stock").value = product.stock || "";

  } catch (err) {
    console.error(err);
    alert("Error cargando producto");
  }
});

const form = document.getElementById("editForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async e => {
  e.preventDefault();

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const formData = new FormData(form);
  const token = localStorage.getItem("adminToken");

  try {
    const res = await fetch(`https://delimaginariodiscos.onrender.com/products/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": "Bearer " + token
      },
      body: formData
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    msg.textContent = "✅ Producto actualizado";
    msg.className = "success";

  } catch (err) {
    msg.textContent = "❌ " + err.message;
    msg.className = "error";
  }
});


