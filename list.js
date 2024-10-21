const itemInput = document.getElementById('itemInput');
const addButton = document.getElementById('addButton');
const groceryList = document.getElementById('groceryList');
const allBtn = document.getElementById('allBtn');
const toBuyBtn = document.getElementById('toBuyBtn');
const purchasedBtn = document.getElementById('purchasedBtn');

let items = []; 

addButton.addEventListener('click', () => {
    const itemName = itemInput.value.trim();
    if (itemName) {
        items.push({ name: itemName, purchased: false });
        itemInput.value = ''; 
        renderItems();
    }
});

function toggleItem(index) {
    items[index].purchased = !items[index].purchased;
    renderItems();
}

