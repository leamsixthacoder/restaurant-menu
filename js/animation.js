const restauranName = document.querySelector('.brand')


document.addEventListener('DOMContentLoaded', () => {
    // restauranName.classList.add('bounce-in')

    restauranName.addEventListener('animationend', () => {
        restauranName.classList.add('hidden');
        otherElement.style.opacity = '1';
    })


})


function initializeSlider(slides, startIndex, intervalDuration, nextSlideFunction, styleClass) {
    let index = startIndex;
    let intervalId = null;

    function showSlide(index) {
        if (index >= slides.length) {
            index = 0;
        } else if (index < 0) {
            index = slides.length - 1;
        }

        slides.forEach(slide => {
            slide.classList.remove(styleClass);
        });

        slides[index].classList.add(styleClass)
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
            slides[startIndex].classList.add(styleClass);
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
    document.querySelectorAll('.dishes .dishes-slides'), 
    0, 
    4000, 
    menuContainerNextSlide,
    'displaySlide'
)

function menuContainerNextSlide() {
    menuContainerSlider.nextSlide();
}

const mainContent = initializeSlider(
    document.querySelectorAll('.slider'), 
    0, 
    8000, 
    mainContentNextSlide,
    'displaySlide'
)

function mainContentNextSlide() {
    mainContent.nextSlide();
}


