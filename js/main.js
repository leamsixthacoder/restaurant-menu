const menuArray = JSON.parse(localStorage.getItem('menus')) || [];
const addedValues = [];

const menuContainer = document.getElementById('menuContainer');
// const add = document.getElementById('add');
const addMoreField = document.getElementById('add-more');
const popup = document.querySelector('.pop-up');
const save = document.getElementById('save');
const close = document.querySelector('.backButton');
const deleteArray = document.getElementById('delete');
const displayArea = document.getElementById('display-area');
const foodMenuNameInput = document.getElementById('food-menu-name');
const message = document.createElement('span');
const listContainerContent = document.querySelector('.list-container-content')

message.className = 'warning'

loadMenus();

// add.addEventListener('click', openPopup);
addMoreField.addEventListener('click', addMoreFields);
save.addEventListener('click', addMenuList);
close.addEventListener('click', closePop);

function openPopup() {
    popup.classList.remove('hidden')

    const storedMenus = JSON.parse(localStorage.getItem('menus')) || [];

    // Clear existing content
    listContainerContent.innerHTML = '';
    storedMenus.forEach(menus => {


        const listContainerItem = document.createElement('div');
        listContainerItem.classList.add('list-container-item');
        listContainerItem.innerHTML = `
    
         <span id="menu-li" href="">${menus.name}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24"
                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round"
                stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 7l16 0" />
                <path d="M10 11l0 6" />
                <path d="M14 11l0 6" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="24" height="24"
                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round"
                stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                <path d="M13.5 6.5l4 4" /></svg>
        
        `;

        listContainerContent.appendChild(listContainerItem)
    })





    // document.querySelector('.header-add-menu h3').innerHTML = 'Añadir Menu'
}

function closePop() {
    // document.querySelectorAll('.dynamic-fields input').forEach(input => (input.value = ''));
    // foodMenuNameInput.value = '';
    // displayArea.innerHTML = '';
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
                <h2 onclick="openPopup()">${menu.name}</h2>
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