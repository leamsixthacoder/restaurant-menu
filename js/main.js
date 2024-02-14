const menuArray = JSON.parse(localStorage.getItem('menus')) || [];
const addedValues = [];

const menuContainer = document.getElementById('menuContainer');
const add = document.getElementById('add');
const addMoreField = document.getElementById('add-more');
const popup = document.querySelector('.pop-up');
const save = document.getElementById('save');
const close = document.getElementById('close');
const displayArea = document.getElementById('display-area');
const foodMenuNameInput = document.getElementById('food-menu-name');

//Image slider

const slidesLeft = document.querySelectorAll('.slides-left img')
const slideRight = document.querySelectorAll('.slides-right img')
let slideIndexLeft = 0
let slideIndexRight = 0
let intervalIdLeft = null;
let intervalIdRight = null;

document.addEventListener('DOMContentLoaded', initializerSlide)

function initializerSlide() {
    if (slidesLeft.length > 0) {
        slidesLeft[slideIndexLeft].classList.add('displaySlide')
        intervalIdLeft = setInterval(nextSlideLeft, 5000)
    }
    if (slideRight.length > 0) {
        slideRight[slideIndexRight].classList.add('displaySlide')
        intervalIdRight = setInterval(nextSlideRight, 5000)
    }

}

function showSlideLeft(index) {
    if (index >= slidesLeft.length) {
         slideIndexLeft = 0

    } else if (index < 0) {
        slideIndexLeft = slidesLeft.length - 1

    }
    slidesLeft.forEach(slide => {
        slide.classList.remove('displaySlide')
    })
    slidesLeft[slideIndexLeft].classList.add('displaySlide')

}
function showSlideRight(index) {
    
    if ( index >= slideRight.length) {
         slideIndexRight = 0
    } else if (index < 0) {
        slideIndexRight = slideRight.length - 1
    }
    slideRight.forEach(slide => {
        slide.classList.remove('displaySlide')
    })
    slideRight[slideIndexRight].classList.add('displaySlide')
}
function nextSlideLeft() {
    slideIndexLeft++
    showSlideLeft(slideIndexLeft)

}
function nextSlideRight() {
    slideIndexRight++
    showSlideRight(slideIndexRight)
}




loadMenus();

add.addEventListener('click', () => popup.classList.remove('hidden'));
addMoreField.addEventListener('click', addMoreFields);
save.addEventListener('click', addMenuList);
close.addEventListener('click', closePop);


function closePop() {
    document.querySelectorAll('.dynamic-fields input').forEach(input => (input.value = ''));
    foodMenuNameInput.value = '';
    popup.classList.add('hidden');
}

function addMoreFields() {
    const dishValue = document.querySelector('.dynamic-fields .dish-input').value;
    const priceValue = document.querySelector('.dynamic-fields .price-input').value;

    if (dishValue && priceValue) {
        const newItem = document.createElement('div');
        newItem.textContent = `Plato: ${dishValue}, Precio: ${priceValue}`;
        displayArea.appendChild(newItem);

        // Store the values
        addedValues.push({
            dish: dishValue,
            price: priceValue
        });

        document.querySelectorAll('.dynamic-fields input').forEach(input => (input.value = ''));
    }
}

function addMenuList() {
    const menuName = foodMenuNameInput.value;
    const message = document.createElement('span')
    if (menuName && addedValues.length > 0) {
        menuArray.push({
            name: menuName,
            menu: addedValues
        });

        // Save menuArray to local storage
        localStorage.setItem('menus', JSON.stringify(menuArray));

        // Reset addedValues for the next menu
        addedValues.length = 0;

        // Clear the display area
        displayArea.innerHTML = '';

        // Clear the form
        foodMenuNameInput.value = '';
        document.querySelectorAll('.dynamic-fields input').forEach(input => (input.value = ''));

        // Close the popup
        popup.classList.add('hidden');

        // Append each menu to the menuContainer
        loadMenus();
        location.reload()
    }
}

function loadMenus() {
    // Load existing menus from local storage
    const storedMenus = JSON.parse(localStorage.getItem('menus')) || [];

    // Create food menu container
    menuContainer.innerHTML = '';
    storedMenus.forEach(menu => {
        const container = document.createElement('div');
        container.className = 'food-menu';
        container.innerHTML = `
            <div class="menu-header">
                <div class="menu-header-action">
                <h2 onclick="editMenu(${storedMenus.indexOf(menu)})">${menu.name}</h2>
                </div>
                <span>RD$</span>
            </div>
            ${menu.menu
                .map(
                    dish => `
                        <div class="menu-content">
                            <h3>${dish.dish}</h3>
                            
                            <span>${dish.price}</span>
                        </div>
                    `
                )
                .join('')}
        `;
        menuContainer.appendChild(container);
    });
}


function editMenu(index) {
    // Open modal
    popup.classList.remove('hidden');

    // Load the selected menu for editing
    const selectedMenu = menuArray[index];

    document.getElementById('food-menu-name').value = selectedMenu.name;
    addedValues.length = 0;
    addedValues.push(...selectedMenu.menu);

    // Display existing menu items
    displayArea.innerHTML = '';
    selectedMenu.menu.forEach(dish => {
        const newItem = document.createElement('div');
        newItem.textContent = `Plato: ${dish.dish}, Precio: ${dish.price}`;
        displayArea.appendChild(newItem);
    });

    // Remove the selected menu from menuArray
    menuArray.splice(index, 1);

    // Save the updated menuArray to local storage
    localStorage.setItem('menus', JSON.stringify(menuArray));


}
