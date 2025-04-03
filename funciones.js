fetch("ultimoslanz.json")
.then(response => response.json())
.then(data => {
    const contenedor = document.getElementById("productos");
    data.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");

        const img = document.createElement("img");
        img.src = producto.imagen;
        img.alt = producto.nombre;

        const nombre = document.createElement("p");
        nombre.textContent = producto.nombre;

        div.appendChild(img);
        div.appendChild(nombre);

        contenedor.appendChild(div);
    });
})
.catch(error => console.error("Error cargando los productos:", error));