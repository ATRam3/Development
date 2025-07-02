const desserts = [
    {
      id: 1,
      name: "Waffle",
      title: "Waffle with Berries",
      price: "$6.50",
      image: "assets/images/image-waffle-mobile.jpg",
      alt: "Waffle with Berries",
      quantity: 1
    },
    {
      id: 2,
      name: "Crème Brûlée",
      title: "Vanilla Bean Crème Brûlée",
      price: "$7.00",
      image: "assets/images/image-creme-brulee-mobile.jpg",
      alt: "Vanilla Bean Crème Brûlée",
      quantity: 1
    },
    {
      id: 3,
      name: "Macaron",
      title: "Macaron Mix of Five",
      price: "$8.00",
      image: "assets/images/image-macaron-mobile.jpg",
      alt: "Macaron Mix of Five",
      quantity: 1
    },
    {
      id: 4,
      name: "Tiramisu",
      title: "Classic Tiramisu",
      price: "$5.50",
      image: "assets/images/image-tiramisu-mobile.jpg",
      alt: "Classic Tiramisu",
      quantity: 1
    },
    {
      id: 5,
      name: "Baklava",
      title: "Pistachio Baklava",
      price: "$4.00",
      image: "assets/images/image-baklava-mobile.jpg",
      alt: "Pistachio Baklava",
      quantity: 1
    },
    {
      id: 6,
      name: "Pie",
      title: "Lemon Meringue Pie",
      price: "$5.00",
      image: "assets/images/image-meringue-mobile.jpg",
      alt: "Lemon Meringue Pie",
      quantity: 1
    },
    {
      id: 7,
      name: "Cake",
      title: "Red Velvet Cake",
      price: "$4.50",
      image: "assets/images/image-cake-mobile.jpg",
      alt: "Red Velvet Cake",
      quantity: 1
    },
    {
      id: 8,
      name: "Brownie",
      title: "Salted Caramel Brownie",
      price: "$4.50",
      image: "assets/images/image-brownie-mobile.jpg",
      alt: "Salted Caramel Brownie",
      quantity: 1
    },
    {
      id: 9,
      name: "Panna Cotta",
      title: "Vanilla Panna Cotta",
      price: "$6.50",
      image: "assets/images/image-panna-cotta-mobile.jpg",
      alt: "Vanilla Panna Cotta",
      quantity: 1
    }
  ];

  renderDesserts(); // Initial render of desserts
  
  // ... your desserts array remains the same ...

function renderDesserts() {
  const dessertItems = document.querySelector('.dessert__items');
  dessertItems.innerHTML = ''; // Clear existing items
  desserts.forEach(function(dessert) {
    const dessertItem = document.createElement('div');
    dessertItem.classList.add('dessert__item');
    dessertItem.setAttribute('data-id', dessert.id); // Add data-id to dessert items

    dessertItem.innerHTML = `
      <div class="dessert__image-container">
        <img src="${dessert.image}" alt="${dessert.alt}" class="dessert__image" data-id="${dessert.id}">
        <button class="dessert__btn" data-id="${dessert.id}">
          <img src="assets/images/icon-add-to-cart.svg" alt="">
          <span class="cart__text">Add to Cart</span>
        </button>
      </div>
      <div class="dessert__info">
        <span class="dessert__name">${dessert.name}</span>
        <h2 class="dessert__item-title">${dessert.title}</h2>
        <p class="dessert__price">${dessert.price}</p>
      </div>
    `;

    dessertItems.appendChild(dessertItem);

    const cartBtn = dessertItem.querySelector('.dessert__btn');
    const dessertImage = dessertItem.querySelector('.dessert__image');

    cartBtn.addEventListener('click', function(e) {
      e.stopPropagation();

      dessertImage.style.border = '2px solid var(--Red)';
      cartBtn.style.display = "none";

      const dessertImageCont = dessertItem.querySelector('.dessert__image-container');
      const itemQuantity = document.createElement('div');
      itemQuantity.classList.add('item__quantity');
      itemQuantity.setAttribute('data-id', dessert.id); // Add data-id to quantity controls

      itemQuantity.innerHTML = `
        <img src="assets/images/icon-decrement-quantity.svg" class="decreament" alt="Decrease">
        <span class="amount">${dessert.quantity}</span>
        <img src="assets/images/icon-increment-quantity.svg" class="increament" alt="Increase">
      `;

      const confirmOrder = document.querySelector('.confirm__order');
      confirmOrder.classList.add('active');

      const delivery = document.querySelector('.delivery');
      delivery.classList.add('active');

      dessertImageCont.appendChild(itemQuantity);

      updateCart(dessert);
      increament(dessert);
      decreament(dessert);
    });
  });
}

  function increament(item) {
    const itemQuantity = document.querySelector(`.item__quantity[data-id="${item.id}"]`);
    if (!itemQuantity) return; 
    
    const increamentBtn = itemQuantity.querySelector('.increament');
    const amount = itemQuantity.querySelector('.amount');

    // Remove any existing listeners to prevent duplicates
    const newIncreamentBtn = increamentBtn.cloneNode(true);
    increamentBtn.replaceWith(newIncreamentBtn);

    newIncreamentBtn.addEventListener('click', function() {
      item.quantity += 1;
      amount.innerText = item.quantity;
      updateCart(item);
    });
  }

  function decreament(item) {
    const itemQuantity = document.querySelector(`.item__quantity[data-id="${item.id}"]`);
    if (!itemQuantity) return; 
    
    const decreamentBtn = itemQuantity.querySelector('.decreament');
    const amount = itemQuantity.querySelector('.amount');

    // Remove any existing listeners to prevent duplicates
    const newDecreamentBtn = decreamentBtn.cloneNode(true);
    decreamentBtn.replaceWith(newDecreamentBtn);

    newDecreamentBtn.addEventListener('click', function() {
      if (item.quantity > 1) {
        item.quantity -= 1;
        amount.innerText = item.quantity;
        updateCart(item);
      } else {
        // Find the correct elements using data-id
        const dessertItem = document.querySelector(`.dessert__item[data-id="${item.id}"]`);
        const dessertImage = dessertItem.querySelector('.dessert__image');
        const cartBtn = dessertItem.querySelector('.dessert__btn');
        
        dessertImage.style.border = 'none';
        cartBtn.style.display = "flex";
        itemQuantity.remove();
        
        // Remove from cart
        const existingCartItem = document.querySelector(`.cart__item[data-id="${item.id}"]`);
        if (existingCartItem) existingCartItem.remove();
        
        // Update cart totals
        totalCartAmount();
        updateCartCount();
      }
    });
  }

  function totalCartAmount() {
    const totalOrder = document.querySelector('.total__order');
    const totalAmount = document.querySelector('.total-amount');
    const cartItems = document.querySelectorAll('.cart__item');

    let total = 0;
    cartItems.forEach(function(item) {
      const priceText = item.querySelector('.total').textContent;
      let price = parseFloat(priceText.replace('$', ''));
      total += price;
    });

    totalOrder.classList.add('active');
    totalAmount.textContent = `$${total.toFixed(2)}`;
  }

  function updateCartCount() {
    const cartItems = document.querySelectorAll('.cart__item');
    const cartQuantity = document.getElementById('cartQuantity');
    const confirmOrder = document.querySelector('.confirm__order');
    const delivery = document.querySelector('.delivery');
    cartQuantity.textContent = cartItems.length;

    if(cartQuantity.textContent === '0') {
      confirmOrder.classList.remove('active');
      delivery.classList.remove('active');
    }
  }

  function updateCart(item) {
    const dessertCartItem = document.querySelector('.dessert__cart-items');
    const numericPrice = parseFloat(item.price.replace('$', ''));
    const emptyCart = document.querySelector(".empty__cart");

    const existingId = dessertCartItem.querySelector(`[data-id="${item.id}"]`);

    if (existingId) {
      const itemAmountSpan = existingId.querySelector('.item__amount');
      const totalPriceSpan = existingId.querySelector('.total');

      itemAmountSpan.innerText = item.quantity;
      totalPriceSpan.innerText = `$${(numericPrice * item.quantity).toFixed(2)}`;
    } else {
      const cartItem = document.createElement('div');
      emptyCart.style.display = 'none';
      cartItem.classList.add('cart__item');
      cartItem.setAttribute('data-id', item.id);
      
      cartItem.innerHTML = `
        <div class="cart__dessert-info">
          <div class="cart__item-info">
            <h2 class="cart__dessert-title">${item.title}</h2>
            <p class="cart__dessert-price">
              <span class="item__amount">${item.quantity}</span>x&nbsp;&nbsp;&nbsp;@ ${item.price} | 
              Total: <span class="total">$${(numericPrice * item.quantity).toFixed(2)}</span>
            </p>
          </div>
          <div class="remove__item" data-id="${item.id}">
            <img src="assets/images/icon-remove-item.svg" alt="Remove item">
          </div>
        </div>
      `;

      dessertCartItem.prepend(cartItem);
      
      // Add remove functionality directly to this item
      const removeBtn = cartItem.querySelector('.remove__item');
      removeBtn.addEventListener('click', function() {
        // Remove cart item
        cartItem.remove();
        
        // Reset product card
        const dessertItem = document.querySelector(`.dessert__item[data-id="${item.id}"]`);
        if (dessertItem) {
          const dessertImage = dessertItem.querySelector('.dessert__image');
          const cartBtn = dessertItem.querySelector('.dessert__btn');
          const itemQuantity = dessertItem.querySelector('.item__quantity');
          
          dessertImage.style.border = 'none';
          cartBtn.style.display = "flex";
          if (itemQuantity) itemQuantity.remove();
        }
        
        // Reset item quantity
        item.quantity = 1;
        
        // Update totals
        totalCartAmount();
        updateCartCount();
      });
    }

    // Update totals
    totalCartAmount();
    updateCartCount();
}

const orderBtn = document.querySelector('.order__btn');

if(orderBtn){
  orderBtn.addEventListener('click', function() {
    const checkout = document.querySelector('.checkout');
    
    checkout.classList.add('active');
  });
}

 const checkout = document.querySelector('.checkout');

 checkout.addEventListener('click', function(e){
  console.log('checkout clicked');
  e.stopPropagation();
   if(e.target === checkout){
     checkout.classList.remove('active');
   }
 });

 const startNewOrder = document.querySelector('.newOrder__btn');

startNewOrder.addEventListener('click', function(e) {
  e.stopPropagation();
  const checkout = document.querySelector('.checkout');
  checkout.classList.remove('active');

  // Reset dessert quantities
  desserts.forEach(function(dessert) {
    dessert.quantity = 1;
  });

  // FIXED: Only remove cart items, preserve other cart elements
  const dessertCartItem = document.querySelector('.dessert__cart-items');
  
  // Remove cart items but keep other elements
  const cartItems = dessertCartItem.querySelectorAll('.cart__item');
  cartItems.forEach(item => item.remove());
  
  // Show empty cart state
  const emptyCart = dessertCartItem.querySelector('.empty__cart');
  if (emptyCart) emptyCart.style.display = 'flex';
  
  // Hide other cart sections
  const totalOrder = dessertCartItem.querySelector('.total__order');
  const delivery = dessertCartItem.querySelector('.delivery');
  const confirmOrder = dessertCartItem.querySelector('.confirm__order');
  
  if (totalOrder) totalOrder.style.display = 'none';
  if (delivery) delivery.style.display = 'none';
  if (confirmOrder) confirmOrder.style.display = 'none';

  // Reset UI state for all dessert items
  const dessertItems = document.querySelectorAll('.dessert__item');
  dessertItems.forEach(function(dessertItem) {
    const dessertImage = dessertItem.querySelector('.dessert__image');
    const cartBtn = dessertItem.querySelector('.dessert__btn');
    const itemQuantity = dessertItem.querySelector('.item__quantity');

    dessertImage.style.border = 'none';
    cartBtn.style.display = "flex";
    if (itemQuantity) itemQuantity.remove();
  });

  // Update cart count and total
  const cartQuantity = document.getElementById('cartQuantity');
  const totalAmount = document.querySelector('.total-amount');
  cartQuantity.textContent = '0';
  totalAmount.textContent = '$0.00';
});
