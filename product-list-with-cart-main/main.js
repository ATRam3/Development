const desserts = [
    {
      id: 1,
      name: "Waffle",
      title: "Waffle with Berries",
      price: "$6.50",
      image: "assets/images/image-waffle-mobile.jpg",
      alt: "Waffle with Berries"
    },
    {
      id: 2,
      name: "Crème Brûlée",
      title: "Vanilla Bean Crème Brûlée",
      price: "$7.00",
      image: "assets/images/image-creme-brulee-mobile.jpg",
      alt: "Vanilla Bean Crème Brûlée"
    },
    {
      id: 3,
      name: "Macaron",
      title: "Macaron Mix of Five",
      price: "$8.00",
      image: "assets/images/image-macaron-mobile.jpg",
      alt: "Macaron Mix of Five"
    },
    {
      id: 4,
      name: "Tiramisu",
      title: "Classic Tiramisu",
      price: "$5.50",
      image: "assets/images/image-tiramisu-mobile.jpg",
      alt: "Classic Tiramisu"
    },
    {
      id: 5,
      name: "Baklava",
      title: "Pistachio Baklava",
      price: "$4.00",
      image: "assets/images/image-baklava-mobile.jpg",
      alt: "Pistachio Baklava"
    },
    {
      id: 6,
      name: "Pie",
      title: "Lemon Meringue Pie",
      price: "$5.00",
      image: "assets/images/image-meringue-mobile.jpg",
      alt: "Lemon Meringue Pie"
    },
    {
      id: 7,
      name: "Cake",
      title: "Red Velvet Cake",
      price: "$4.50",
      image: "assets/images/image-cake-mobile.jpg",
      alt: "Red Velvet Cake"
    },
    {
      id: 8,
      name: "Brownie",
      title: "Salted Caramel Brownie",
      price: "$4.50",
      image: "assets/images/image-brownie-mobile.jpg",
      alt: "Salted Caramel Brownie"
    },
    {
      id: 9,
      name: "Panna Cotta",
      title: "Vanilla Panna Cotta",
      price: "$6.50",
      image: "assets/images/image-panna-cotta-mobile.jpg",
      alt: "Vanilla Panna Cotta"
    }
  ];
  
  const dessertItems = document.querySelector('.dessert__items');
  
  desserts.forEach(function(dessert) {
    const dessertItem = document.createElement('div');
    dessertItem.classList.add('dessert__item');
  
    dessertItem.innerHTML = `
          <div class="dessert__image-container">
            <img src="${dessert.image}" alt="${dessert.alt}" class="dessert__image">
            <button class="dessert__btn">
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
  
    // Append to page
    dessertItems.appendChild(dessertItem);
  
    // Add to cart button logic
    const cartBtn = dessertItem.querySelector('.dessert__btn');
    const dessertImage = dessertItem.querySelector('.dessert__image');
  
    cartBtn.addEventListener('click', function(e) {
      e.stopPropagation();
  
      dessertImage.style.border = '2px solid var(--Red)';
      cartBtn.style.display = "none";
  
      const dessertImageCont = dessertItem.querySelector('.dessert__image-container');
      const itemQuantity = document.createElement('div');
      itemQuantity.classList.add('item__quantity');
  
      itemQuantity.innerHTML = `
        <img src="assets/images/icon-decrement-quantity.svg" class="decreament" alt="">
        <span class="amount">1</span>
        <img src="assets/images/icon-increment-quantity.svg" class="increament" alt="">
      `;
  
      dessertImageCont.appendChild(itemQuantity);
  
      const cartQuantity = document.getElementById('cartQuantity');
      const currentQuantity = parseInt(cartQuantity.innerText) || 0;
      cartQuantity.innerText = currentQuantity + 1;
  
      // Now correctly pass the dessert data object
      updateCart(dessert, currentQuantity + 1);
    });
  });
  
  function updateCart(item, totalQuantity) {
    const dessertCartItem = document.querySelector('.dessert__cart-items');
    const numericPrice = parseFloat(item.price.replace('$', ''));
    const dessertCart = document.querySelector('.dessert__cart');

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart__item');
    
    cartItem.innerHTML = `
      <div class="dessert__image-container">
        <img src="${item.image}" alt="${item.alt}" class="dessert__image">
      </div>
      <div class="dessert__info">
        <h2 class="dessert__item-title">${item.title}</h2>
        <p class="dessert__price">@ ${item.price} | Total: $${(numericPrice * totalQuantity).toFixed(2)}</p>
      </div>
    `;

    dessertCartItem.appendChild(cartItem);


  }