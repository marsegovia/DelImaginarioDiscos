const form = document.getElementById("form-producto");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nuevoProducto = {
        Banda: document.getElementById("banda").value,
        Album: document.getElementById("album").value,
        Precio: Number(document.getElementById("precio").value),
        Stock: Number(document.getElementById("stock").value),
        Imagen: document.getElementById("imagen").value || "",
        isNew: document.getElementById("isNew").checked
    };

    try {
        const res = await fetch("http://localhost:3000/products/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoProducto)
        });

        if (!res.ok) throw new Error("Error en el servidor");

        const data = await res.json();
        mensaje.textContent = "Producto agregado correctamente ✔";
        mensaje.style.color = "lightgreen";

        form.reset();

    } catch (error) {
        console.error(error);
        mensaje.textContent = "Error al agregar producto";
        mensaje.style.color = "red";
    }
});
