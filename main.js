const menuContainer = document.getElementById('menuContainer')
const add = document.getElementById('add')
const addMoreField = document.getElementById('add-more')
const popup = document.querySelector('.pop-up')
add.addEventListener('click', addMenu)
addMoreField.addEventListener('click', addMoreFields)

function addMenu ()  {
    popup.classList.remove('hidden')
}
function addMoreFields ()  {
    const dishValue = document.querySelector('.dynamic-fields .dish-input').value;
    const priceValue = document.querySelector('.dynamic-fields .price-input').value;


    const displayArea = document.getElementById('display-area');
    const newItem = document.createElement('div');
    newItem.textContent = `Plato: ${dishValue}, Precio: ${priceValue}`;
    displayArea.appendChild(newItem);
    document.querySelectorAll('.dynamic-fields input').forEach(input => input.value = '');

}