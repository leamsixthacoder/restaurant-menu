const menuArray = JSON.parse(localStorage.getItem('menus')) || [];
const addedValues = [];

const menuContainer = document.getElementById('menuContainer');
const add = document.getElementById('add');
const addMoreField = document.getElementById('add-more');
const popup = document.querySelector('.pop-up');
const save = document.getElementById('save');
const close = document.getElementById('close');
const deleteArray = document.getElementById('delete');
const displayArea = document.getElementById('display-area');
const foodMenuNameInput = document.getElementById('food-menu-name');
const message = document.createElement('span')
message.className = 'warning'
//Image slider


loadMenus();

add.addEventListener('click', openPopop);
addMoreField.addEventListener('click', addMoreFields);
save.addEventListener('click', addMenuList);
close.addEventListener('click', closePop);

function openPopop () {
    popup.classList.remove('hidden')
    document.querySelector('.header-add-menu h3').innerHTML = 'Añadir Menu'
}
function closePop() {
    document.querySelectorAll('.dynamic-fields input').forEach(input => (input.value = ''));
    foodMenuNameInput.value = '';
    displayArea.innerHTML = '';
    popup.classList.add('hidden');
}

// function deleteList(index) {
//     // Clear the menu array for the specified index
//     menuArray.splice(index, 1);
//     // Save the updated menuArray to local storage
//     localStorage.setItem('menus', JSON.stringify(menuArray));

//     // Reload the menus
//     loadMenus();
// }

function addMoreFields() {
    const dishValue = document.querySelector('.dynamic-fields .dish-input').value;
    const priceValue = document.querySelector('.dynamic-fields .price-input').value;
    save.classList.remove('hidden')
    document.querySelector('form').classList.remove('hidden')

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
    if (menuName && addedValues.length > 0) {

        const existingMenuIndex = menuArray.findIndex(menu => menu.name === menuName);

        if (existingMenuIndex !== -1) {
            // Update the existing menu
            menuArray[existingMenuIndex].menu = addedValues;
        } else {
            // Add a new menu
            menuArray.push({
                name: menuName,
                menu: addedValues
            });
        }

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
    } else {
        displayArea.innerHTML = '';
        message.innerHTML = 'Por favor ingresar el nombre del menu o el plato'
        displayArea.appendChild(message)

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
    document.querySelector('.header-add-menu h3').innerHTML = 'Editar Menu'
    // Load the selected menu for editing
    const selectedMenu = menuArray[index];

    document.getElementById('food-menu-name').value = selectedMenu.name;
    addedValues.length = 0;
    addedValues.push(...selectedMenu.menu);

    // Display existing menu items
    displayArea.innerHTML = '';
    selectedMenu.menu.forEach((dish, dishIndex) => {
        const newItem = document.createElement('div');
        newItem.textContent = `Plato: ${dish.dish}, Precio: ${dish.price}`;
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Eliminar Plato';
        deleteButton.addEventListener('click', () => deleteDish(index, dishIndex));
        newItem.appendChild(deleteButton);
        displayArea.appendChild(newItem);
    });

    deleteArray.addEventListener('click', deleteList(index))
    // Update only the menu property of the selected menu
    selectedMenu.menu = addedValues;

    // Save the updated menuArray to local storage
    localStorage.setItem('menus', JSON.stringify(menuArray));


}

function deleteDish(menuIndex, dishIndex) {
    // Delete the dish from the menu
    menuArray[menuIndex].menu.splice(dishIndex, 1);

    // Save the updated menuArray to local storage
    localStorage.setItem('menus', JSON.stringify(menuArray));

    // Reload the menus
    loadMenus();

    save.classList.add('hidden')
    document.querySelector('form').classList.add('hidden')
}