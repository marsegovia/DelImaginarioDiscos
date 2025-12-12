
    let slideIndex = 0;
    const slides = document.querySelector(".slides");
    const totalSlides = slides.children.length;

    document.querySelector(".next").addEventListener("click", () => {
        slideIndex = (slideIndex + 1) % totalSlides;
        updateCarousel();
    });

    document.querySelector(".prev").addEventListener("click", () => {
        slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });

    function updateCarousel() {
        slides.style.transform = `translateX(-${slideIndex * 100}%)`;
    }

    // Auto-play opcional cada 5 segundos
    setInterval(() => {
        slideIndex = (slideIndex + 1) % totalSlides;
        updateCarousel();
    }, 3000);

