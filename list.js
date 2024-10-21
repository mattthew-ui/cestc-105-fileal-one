document.addEventListener('DOMContentLoaded', ready)

function ready() {
    if (document.getElementsByClassName('cart-items').length > 0) {
        loadCart()

        let removeCartItemButtons = document.getElementsByClassName("btn-danger")
        for (let i = 0; i < removeCartItemButtons.length; i++) {
            let button = removeCartItemButtons[i]
            button.addEventListener('click', removeCartItem)
        }

        let quantityInputs = document.getElementsByClassName('cart-quantity-input')
        for (let i = 0; i < quantityInputs.length; i++) {
            let input = quantityInputs[i]
            input.addEventListener('change', quantityChanged)
        }

        let addToCartButtons = document.getElementsByClassName('shop-item-button')
        for (let i = 0; i < addToCartButtons.length; i++) {
            let button = addToCartButtons[i]
            button.addEventListener('click', addToCartClicked)
        }

        let purchaseButton = document.getElementsByClassName('btn-purchase')[0]
        if (purchaseButton) {
            purchaseButton.addEventListener('click', purchaseClicked)
        }
    }
}
function removeCartItem(event) {
    let buttonClicked = event.target
    let cartRow = buttonClicked.closest('.cart-row') 
    if (cartRow) {
        cartRow.remove()
        updateCartTotal()
        saveCart()
    }
}
function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
    saveCart()
}
function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.closest('.shop-item') 
    if (!shopItem) return

    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src

    addItemToCart(title, price, imageSrc)
    updateCartTotal()
    saveCart()
}
function addItemToCart(title, price, imageSrc) {
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title')

    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title) {
            alert('This item is already added to the cart')
            return
        }
    }
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    cartRow.innerHTML = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" alt="${title}" width="75" height="75">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" min="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`

    cartItems.appendChild(cartRow)

    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}
function updateCartTotal() {
    let cartTotal = 0
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItems.getElementsByClassName('cart-row')

    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        let price = parseFloat(priceElement.innerText.replace('$', ''))
        let quantity = parseInt(quantityElement.value)
        cartTotal += price * quantity
    }
    cartTotal = Math.round(cartTotal * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + cartTotal.toFixed(2)
}
function purchaseClicked() {
    let cartItemsContainer = document.getElementsByClassName('cart-items')[0]
    if (cartItemsContainer.children.length === 0) {
        alert('Your cart is empty!')
        return
    }
    alert('Thank you for your purchase!')
    while (cartItemsContainer.firstChild) {
        cartItemsContainer.removeChild(cartItemsContainer.firstChild)
    }
    updateCartTotal()
    saveCart()
}
function saveCart() {
    let cartItems = []
    let cartRows = document.getElementsByClassName('cart-row')
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let title = cartRow.getElementsByClassName('cart-item-title')[0].innerText
        let price = cartRow.getElementsByClassName('cart-price')[0].innerText
        let imageSrc = cartRow.getElementsByClassName('cart-item-image')[0].src
        let quantity = cartRow.getElementsByClassName('cart-quantity-input')[0].value
        cartItems.push({ title, price, imageSrc, quantity })
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
}
function loadCart() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems'))
    if (cartItems && cartItems.length > 0) {
        let cartItemsContainer = document.getElementsByClassName('cart-items')[0]
        cartItems.forEach(item => {
            let cartRow = document.createElement('div')
            cartRow.classList.add('cart-row')
            cartRow.innerHTML = `
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src="${item.imageSrc}" alt="${item.title}" width="75" height="75">
                    <span class="cart-item-title">${item.title}</span>
                </div>
                <span class="cart-price cart-column">${item.price}</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="${item.quantity}" min="1">
                    <button class="btn btn-danger" type="button">REMOVE</button>
                </div>`
            cartItemsContainer.appendChild(cartRow)

            cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
            cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
        })
        updateCartTotal()
    }
}