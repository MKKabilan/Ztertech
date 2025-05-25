const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartDrawer = document.getElementById('cart-drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const cartCount = document.getElementById('cart-count');
const cartContainer = document.getElementById('cart');

let cartItems = [];

// Add item to cart
function addToCart(product, price) {
  cartItems.push({ product, price });
  updateCartUI();
  openCart();
}

// Remove item from cart by index
function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCartUI();
}

// Update cart UI with items and total
function updateCartUI() {
  cartContainer.innerHTML = '';
  let total = 0;

  if (cartItems.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    cartItems.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.innerHTML = `
        <p>${item.product} - $${item.price.toFixed(2)}</p>
        <button onclick="removeFromCart(${index})" aria-label="Remove ${item.product} from cart">Remove</button>
      `;
      cartContainer.appendChild(itemElement);
      total += item.price;
    });

    const totalElement = document.createElement('p');
    totalElement.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    cartContainer.appendChild(totalElement);
  }

  cartCount.textContent = cartItems.length;
}

// Open the cart drawer
function openCart() {
  cartDrawer.classList.add('open');
  drawerOverlay.classList.add('active');
  document.body.classList.add('cart-open');
  cartDrawer.setAttribute('aria-hidden', 'false');
  openCartBtn.setAttribute('aria-expanded', 'true');
  drawerOverlay.style.display = 'block';
}

// Close the cart drawer
function closeCart() {
  cartDrawer.classList.remove('open');
  drawerOverlay.classList.remove('active');
  document.body.classList.remove('cart-open');
  cartDrawer.setAttribute('aria-hidden', 'true');
  openCartBtn.setAttribute('aria-expanded', 'false');
  drawerOverlay.style.display = 'none';
}

// Event listeners
openCartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
drawerOverlay.addEventListener('click', closeCart);

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
