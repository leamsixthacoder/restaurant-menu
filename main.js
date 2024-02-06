const menuArray = JSON.parse(localStorage.getItem('menus')) || [];
const addedValues = [];

const menuContainer = document.getElementById('menuContainer')
const add = document.getElementById('add')
const addMoreField = document.getElementById('add-more')
const popup = document.querySelector('.pop-up')
const save = document.getElementById('save')

loadMenus();

add.addEventListener('click', addMenu)
addMoreField.addEventListener('click', addMoreFields)
save.addEventListener('click', addMenuList)




const displayArea = document.getElementById('display-area');


function addMenu() {
    popup.classList.remove('hidden')
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

        document.querySelectorAll('.dynamic-fields input').forEach(input => input.value = '');
    } else {

    }
}


function addMenuList() {
    const menuName = document.getElementById('food-menu-name').value

    if (menuName && addedValues.length > 0) {
        menuArray.push({
            name: menuName,
            menu: addedValues

        });

        // Save menuArray to local storage
        localStorage.setItem('menus', JSON.stringify(menuArray));

        // Reset addedValues for the next menu
        addedValues.length = 0;

        // Append each menu to the menuContainer
        loadMenus();

        // Clear the display area
        displayArea.innerHTML = '';
        document.getElementById('food-menu-name').value = ''
        menuContainer.innerHTML = '';
        popup.classList.add('hidden');
    } else {

    }
}

function loadMenus() {
    // Load existing menus from local storage
    const storedMenus = JSON.parse(localStorage.getItem('menus')) || [];
    //create food menu container
    storedMenus.forEach(menu => {

        const container = document.createElement('div');
        container.className = 'food-menu'
        container.innerHTML = `
            <div class="menu-header">
              <h2>${menu.name}</h2>
              <span>RD$</span>
            </div>
            ${menu.menu.map(dish => `
            <div class="menu-content">
            <h3>${dish.dish}</h3>
            <span>${dish.price}</span>
          </div>
            `).join('')}

            `;
        menuContainer.appendChild(container)

    })

}