const restauranName = document.querySelector('.brand')


document.addEventListener('DOMContentLoaded', () => {
    restauranName.classList.add('bounce-in')
    setTimeout(() => {
        restauranName.classList.add('hidden');
    }, 2500); 

        document.querySelector('section').classList.remove('hidden')


})


function initializeSlider(slides, startIndex, intervalDuration, nextSlideFunction) {
    let index = startIndex;
    let intervalId = null;

    function showSlide(index) {
        if (index >= slides.length) {
            index = 0;
        } else if (index < 0) {
            index = slides.length - 1;
        }

        slides.forEach(slide => {
            slide.classList.remove('displaySlide');
        });

        slides[index].classList.add('displaySlide')
    }

    function nextSlide() {
        index++;
        if (index >= slides.length) {
            index = 0;
        }
        showSlide(index);
    }

    document.addEventListener('DOMContentLoaded', () => {
        if (slides.length > 0) {
            slides[startIndex].classList.add('displaySlide');
            intervalId = setInterval(nextSlideFunction, intervalDuration);
        }
    });

    return {
        showSlide,
        nextSlide
    };
}







//Menu Container Slider
const menuContainerSlider = initializeSlider(
    document.querySelectorAll('.menu-container'), 
    0, 
    5000, 
    menuContainerNextSlide
)

function menuContainerNextSlide() {
    menuContainerSlider.nextSlide();
}


