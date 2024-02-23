const restauranName = document.querySelector('.brand')


document.addEventListener('DOMContentLoaded', () => {
    restauranName.classList.add('bounce-in')
    setTimeout(() => {
        restauranName.classList.add('hidden');
    }, 2500); 
    document.querySelector('.menu-container').classList.remove('hidden')

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



//Image Slider

const imageSlider = initializeSlider(
    document.querySelectorAll('.slides-left img'),
    0,
    6000,
    nextSlideImage
)


//Top Menu Slider
const topMenuSlider = initializeSlider(
    document.querySelectorAll('.menu-container'), 
    0, 
    5000, 
    nextSlide
)

// Bottom Menu Slider
const bottomMenuSlider = initializeSlider(
    document.querySelectorAll('.food-menu'),
    0,
    9000,
    nextSlideBottom
);
// Bottom Menu Slider Drinks
const bottomMenuSliderDrinks = initializeSlider(
    document.querySelectorAll('.food-menu-drinks'),
    0,
    9000,
    nextSlideBottomDrinks
);

function nextSlideImage() {
    imageSlider.nextSlide();
}


function nextSlide() {
    topMenuSlider.nextSlide();
}


function nextSlideBottom() {
    bottomMenuSlider.nextSlide();
}
function nextSlideBottomDrinks() {
    bottomMenuSliderDrinks.nextSlide();
}
