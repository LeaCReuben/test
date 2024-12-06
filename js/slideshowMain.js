let slideIndex = 0;

function changeSlide(direction) {
    const slideshow = document.querySelector('.slideshow');
    const items = document.querySelectorAll('.slides');
    slideIndex += direction;

    if (slideIndex < 0) {
        slideIndex = items.length - 1;
    } else if (slideIndex >= items.length) {
        slideIndex = 0;
    }
    slideshow.style.transform = `translateX(${-slideIndex * 100}%)`;
}
