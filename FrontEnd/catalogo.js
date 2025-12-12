async function cargarProductos() {
    try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();

        console.log("Productos recibidos:", data);

        const contenedor = document.getElementById("productos2");
        contenedor.innerHTML = ""; // Limpia el contenedor

        data.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("producto");

            // Imagen
            const img = document.createElement("img");
            img.src = producto.imagen || "./images/default.png"; 
            img.alt = producto.Album;

            // Nombre
            const nombre = document.createElement("p");
            nombre.textContent = `${producto.Banda} - ${producto.Album}`;

            // Precio
            const precio = document.createElement("p");
            precio.textContent = `$${producto.Precio}`;

            // Render
            div.appendChild(img);
            div.appendChild(nombre);
            div.appendChild(precio);

            contenedor.appendChild(div);
        });

    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}

cargarProductos();
