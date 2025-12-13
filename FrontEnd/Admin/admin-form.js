const form = document.getElementById("formProducto");
const msg = document.getElementById("admin-msg");

console.log("🟢 admin-form cargado");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("🟢 SUBMIT OK");

    msg.textContent = "Guardando producto...";

    const formData = new FormData(form);

    // Debug: ver qué se manda
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    // Normalizar texto
    ["banda", "album", "pais", "estilo", "sello"].forEach(campo => {
      const val = formData.get(campo);
      if (val) {
        formData.set(
          campo,
          val.charAt(0).toUpperCase() + val.slice(1)
        );
      }
    });

    try {
      const res = await fetch("http://localhost:3000/products/create", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      console.log("🟣 STATUS:", res.status, data);

      if (!res.ok) {
        throw new Error(data.error || "Error al crear producto");
      }

      msg.textContent = "✅ Producto agregado correctamente";
      form.reset();

    } catch (err) {
      console.error(err);
      msg.textContent = "❌ Error al guardar producto";
    }
  });
}
