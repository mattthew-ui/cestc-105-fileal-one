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

function renderItems(filter = 'all') {
    groceryList.innerHTML = ''; 


    const filteredItems = items.filter(item => {
        if (filter === 'toBuy') return !item.purchased;
        if (filter === 'purchased') return item.purchased;
        return true; 
    });

    filteredItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.name;
        li.classList.toggle('purchased', item.purchased);
        li.addEventListener('click', () => toggleItem(index));
        groceryList.appendChild(li);
    });
}

allBtn.addEventListener('click', () => renderItems('all'));
toBuyBtn.addEventListener('click', () => renderItems('toBuy'));
purchasedBtn.addEventListener('click', () => renderItems('purchased'));

renderItems();