fetch("catalogo.json")
.then(response => response.json())
.then(data => {
    const contenedor = document.getElementById("productos2");
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

  const slides = document.querySelector('.slides');
  const totalSlides = document.querySelectorAll('.slides img').length;
  let index = 0;

  function showSlide(i) {
    slides.style.transform = `translateX(-${i * 100}%)`;
  }

  document.querySelector('.next').addEventListener('click', () => {
    index = (index + 1) % totalSlides;
    showSlide(index);
  });

  document.querySelector('.prev').addEventListener('click', () => {
    index = (index - 1 + totalSlides) % totalSlides;
    showSlide(index);
  });

  // Autoplay
  setInterval(() => {
    index = (index + 1) % totalSlides;
    showSlide(index);
  }, 5000); // cambia cada 5 segundos