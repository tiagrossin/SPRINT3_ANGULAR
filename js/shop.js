// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
  {
    id: 1,
    name: "Cooking Oil",
    price: 10.5,
    type: "grocery",
    offer: {
      number: 3,
      percent: 4.76190476190476,
    },
  },
  {
    id: 2,
    name: "Pasta",
    price: 6.25,
    type: "grocery",
  },
  {
    id: 3,
    name: "Instant cupcake mixture",
    price: 5,
    type: "grocery",
    offer: {
      number: 10,
      percent: 33.3333333334,
    },
  },
  {
    id: 4,
    name: "All-in-one",
    price: 260,
    type: "beauty",
  },
  {
    id: 5,
    name: "Zero Make-up Kit",
    price: 20.5,
    type: "beauty",
  },
  {
    id: 6,
    name: "Lip Tints",
    price: 12.75,
    type: "beauty",
  },
  {
    id: 7,
    name: "Lawn Dress",
    price: 15,
    type: "clothes",
  },
  {
    id: 8,
    name: "Lawn-Chiffon Combo",
    price: 19.99,
    type: "clothes",
  },
  {
    id: 9,
    name: "Toddler Frock",
    price: 9.99,
    type: "clothes",
  },
];
// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
  for (let i = 0; i < products.length; i++) {
    if (id == products[i].id) {
      cartList.push(products[i]);
    }
  }
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cartList array
  cartNotif();
  generateCart();
  applyPromotionsCart();
  calculateTotal();
}

// Exercise 2
function cleanCart() {
  cartList = [];
  document.getElementById("cart_list").innerHTML = " ";
  document.getElementById("total_price").innerHTML = "0";
  cartNotif();
}

// Exercise 3
function calculateTotal() {
  let soFarCart = 0;
  for (const product of cart) {
    soFarCart += product.subtotalWithDiscount;
  }
  document.getElementById("total_price").innerHTML = soFarCart.toFixed(2);
}
// Calculate total price of the cart using the "cartList" array

// Exercise 4
function generateCart() {
  const productCounts = {};

  for (let i = 0; i < cartList.length; i++) {
    const productId = cartList[i].id;

    if (productCounts[productId]) {
      productCounts[productId]++;
    } else {
      productCounts[productId] = 1;
    }
  }

  cart.length = 0;

  for (const productId in productCounts) {
    const product = cartList.find((item) => item.id == productId);
    if (product) {
      generatedProduct = {
        ...product,
        quantity: productCounts[productId],
      };
      generatedProduct = {
        ...product,
        quantity: productCounts[productId],
        subtotal: generatedProduct.quantity * generatedProduct.price,
        subtotalWithDiscount: 0,
      };
      cart.push(generatedProduct);
    }
  }
}
// Using the "cartlist" array that contains all the items in the shopping cart,
// generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.

// Exercise 5
function applyPromotionsCart() {
  for (const product of cart) {
    if (product.offer && product.quantity >= product.offer.number) {
      product.subtotalWithDiscount =
        (product.price - product.price * (product.offer.percent / 100)) *
        product.quantity;
    } else {
      product.subtotalWithDiscount = product.subtotal;
    }
  }
  // Apply promotions to each item in the array "cart"
}

// Exercise 6
function printCart() {
  const printedCart = document.getElementById("cart_list");
  printedCart.innerHTML = " ";

  cart.forEach((product) => {
    printedCart.innerHTML += ` <tr>
  <th scope="row">${product.name}</th>
  <td>${product.price}</td>
  <td>${product.quantity}</td>
  <td>${product.subtotalWithDiscount.toFixed(2)}</td>
  <button class="btn-danger" onclick="removeFromCart(${product.id})">Delete from cart</button>
</tr>`;
  });
  // Fill the shopping cart modal manipulating the shopping cart dom
}

// ** Nivell II **

// Exercise 7
function addToCart(id) {
  // Refactor previous code in order to simplify it
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cart array or update its quantity in case it has been added previously.
}

// Exercise 8
function removeFromCart(id) {
  const index = cart.findIndex((product) => product.id === id);

  if (index !== -1) {
    cart[index].quantity--;

    if (cart[index].quantity === 0) {
      cart.splice(index, 1);
    }

    cartNotif();
    applyPromotionsCart();
    calculateTotal();

    printCart();
  }
}



function open_modal() {
  console.log("Open Modal");
  printCart();
}

function cartNotif() {
  const tally = document.getElementById("count_product");
  let productCount = 0;
  cartList.forEach((product) => {
    productCount++;
  });
  tally.innerHTML = productCount;
}
