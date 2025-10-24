function initCarousel(containerSelector, intervalTime = 3000) {
    const container = document.querySelector(containerSelector);
    const track = container.querySelector('.carousel-track');
    const images = container.querySelectorAll('.carousel-image');
    const dots = container.querySelectorAll('.dot');
    const prevBtn = container.querySelector('.carousel-btn.prev');
    const nextBtn = container.querySelector('.carousel-btn.next');
    let currentIndex = 0;
    const totalImages = images.length;
    let autoSlide;
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
    }
    function prevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarousel();
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);
    function startAutoSlide() {
        autoSlide = setInterval(nextImage, intervalTime);
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    startAutoSlide();

    container.addEventListener('mouseenter', stopAutoSlide);
    container.addEventListener('mouseleave', startAutoSlide);
}
initCarousel('.top-carousel', 2000);    
initCarousel('.bottom-carousel', 4000); 
