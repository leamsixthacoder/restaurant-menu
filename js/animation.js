
//Image Slider

const imageSlide = document.querySelectorAll('.slides-left img')
let imageSlideIndex = 0
let imageSlideintervalId = null;


document.addEventListener('DOMContentLoaded', initializerSlide)

function initializerSlide() {
    if (imageSlide.length > 0) {
        imageSlide[imageSlideIndex].classList.add('displaySlide')
        imageSlideintervalId = setInterval(nextSlideImage, 5000)
    }

}

function showSlideImage(index) {
    if (index >= imageSlide.length) {
        imageSlideIndex = 0

    } else if (index < 0) {
        imageSlideIndex = imageSlide.length - 1

    }
    imageSlide.forEach(slide => {
        slide.classList.remove('displaySlide')
    })
    imageSlide[imageSlideIndex].classList.add('displaySlide')

}

function nextSlideImage() {
    imageSlideIndex++
    showSlideImage(imageSlideIndex)

}


//Top Menu Slider
const slidesMenuTop = document.querySelectorAll('.food-menu-static') 
let slideMenuTopIndex = 0
let intervalIdTop = null;


document.addEventListener('DOMContentLoaded', initializerSlideMenu)

function initializerSlideMenu() {
    if (slidesMenuTop.length > 0) {
        slidesMenuTop[slideMenuTopIndex].classList.add('displaySlideMenu')
        intervalIdTop = setInterval(nextSlide, 9000)
    }
}

function showSlide(index) {
    if (index >= slidesMenuTop.length) {
        slideMenuTopIndex = 0

    } else if (index < 0) {
        slideMenuTopIndex = slidesMenuTop.length - 1

    }
    slidesMenuTop.forEach(slide => {
        slide.classList.remove('displaySlideMenu')
    })
    slidesMenuTop[slideMenuTopIndex].classList.add('displaySlideMenu')

}


function nextSlide() {
    slideMenuTopIndex++
    showSlide(slideMenuTopIndex)

}

//Bottom Menu Slider

//Top Menu Slider
const slidesMenuBottom = document.querySelectorAll('.food-menu') 
let slideMenuBottomIndex = 0
let intervalIdBottom = null;


document.addEventListener('DOMContentLoaded', initializerSlideMenuBottom)

function initializerSlideMenuBottom() {
    if (slidesMenuBottom.length > 0) {
        slidesMenuBottom[slideMenuBottomIndex].classList.add('displaySlideMenu')
        intervalIdBottom = setInterval(nextSlideBottom, 9000)
    }
}

function showSlideBottom(index) {
    if (index >= slidesMenuBottom.length) {
        slideMenuBottomIndex = 0

    } else if (index < 0) {
        slideMenuBottomIndex = slidesMenuBottom.length - 1

    }
    slidesMenuBottom.forEach(slide => {
        slide.classList.remove('displaySlideMenu')
    })
    slidesMenuBottom[slideMenuBottomIndex].classList.add('displaySlideMenu')

}


function nextSlideBottom() {
    slideMenuBottomIndex++
    showSlideBottom(slideMenuBottomIndex)

}
