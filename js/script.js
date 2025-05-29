const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartDrawer = document.getElementById('cart-drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const cartCount = document.getElementById('cart-count');
const cartContainer = document.getElementById('cart');

let cartItems = [];

// Load cart from localStorage on page load
function loadCart() {
  const savedCart = localStorage.getItem('cartItems');
  if (savedCart) {
    cartItems = JSON.parse(savedCart);
  } else {
    cartItems = [];
  }
}

// Save cart to localStorage whenever it changes
function saveCart() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Add item to cart (with quantity increment)
function addToCart(productId) {
  const product = window.products.find(p => p.id === parseInt(productId));
  if (!product) return;

  const existingItem = cartItems.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ id: product.id, product: product.name, price: product.price, image: product.image, quantity: 1 });
  }
  saveCart();
  updateCartUI();
  openCart();
}

// Remove item from cart by index
function removeFromCart(index) {
  cartItems.splice(index, 1);
  saveCart();
  updateCartUI();
}

// Format cart details into a message string for orders
function formatCartMessage() {
  if (cartItems.length === 0) return "Your cart is empty.";
  let message = "Hello, I'd like to order the following items:%0A";
  cartItems.forEach(item => {
    message += `- ${item.product} × ${item.quantity}%0A`;
  });
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  message += `Total: $${total.toFixed(2)}`;
  return encodeURIComponent(message);
}

// WhatsApp ordering function
function orderViaWhatsApp() {
  const phoneNumber = '917010615338'; // Replace with your WhatsApp number (without +)
  const message = formatCartMessage();
  const url = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(url, '_blank');
}

// Instagram ordering function
function orderViaInstagram() {
  const instagramUsername = 'YOUR_INSTAGRAM_USERNAME'; // Replace with your Instagram username
  const message = decodeURIComponent(formatCartMessage());
  const url = `https://www.instagram.com/${instagramUsername}/`;
  window.open(url, '_blank');
  alert('Please send your order message on Instagram:\n\n' + message);
}

function updateCartUI() {
  cartContainer.innerHTML = '';
  let total = 0;

  if (cartItems.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    // Add order buttons at the top
    const orderButtons = document.createElement('div');
    orderButtons.className = 'order-buttons';
    orderButtons.innerHTML = `
  <button id="order-whatsapp" class="order-btn whatsapp-btn" type="button">Order via WhatsApp</button>
  <button id="order-instagram" class="order-btn instagram-btn" type="button">Order via Instagram</button>
`;

    cartContainer.appendChild(orderButtons);

    // Add each cart item
    cartItems.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.dataset.index = index;
      itemElement.innerHTML = `
        <div class="cart-item-content">
          <img src="${item.image}" alt="${item.product}" class="cart-item-image" loading="lazy" />
          <div class="cart-item-details">
            <p>${item.product} - $${item.price.toFixed(2)} × ${item.quantity}</p>
            <button class="remove-item-btn" aria-label="Remove ${item.product} from cart">Remove</button>
          </div>
        </div>
      `;
      cartContainer.appendChild(itemElement);
      total += item.price * item.quantity;
    });

    // Add total price after items
    const totalElement = document.createElement('p');
    totalElement.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    cartContainer.appendChild(totalElement);

    // Event listeners for the buttons
    document.getElementById('order-whatsapp').addEventListener('click', orderViaWhatsApp);
    document.getElementById('order-instagram').addEventListener('click', orderViaInstagram);
  }

  // Update cart count in header
  cartCount.textContent = cartItems.reduce((acc, item) => acc + item.quantity, 0);
}
// Focus trap for accessibility
const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
let focusableElements = [];
let firstFocusableElement = null;
let lastFocusableElement = null;

function trapFocus(element) {
  focusableElements = element.querySelectorAll(focusableSelectors);
  firstFocusableElement = focusableElements[0];
  lastFocusableElement = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          e.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          e.preventDefault();
          firstFocusableElement.focus();
        }
      }
    }
    if (e.key === 'Escape') {
      closeCart();
      
    }
  });
}

function openCart() {
  cartDrawer.classList.add('open');
  drawerOverlay.classList.add('active');
  document.body.classList.add('cart-open');
  cartDrawer.setAttribute('aria-hidden', 'false');
  openCartBtn.setAttribute('aria-expanded', 'true');
  drawerOverlay.style.display = 'block';
  cartDrawer.focus();
  trapFocus(cartDrawer);
}

function closeCart() {
  cartDrawer.classList.remove('open');
  drawerOverlay.classList.remove('active');
  document.body.classList.remove('cart-open');
  cartDrawer.setAttribute('aria-hidden', 'true');
  openCartBtn.setAttribute('aria-expanded', 'false');
  drawerOverlay.style.display = 'none';
  openCartBtn.focus();
}

openCartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
drawerOverlay.addEventListener('click', closeCart);

cartContainer.addEventListener('click', function(e) {
  if (e.target.classList.contains('remove-item-btn')) {
    const itemElement = e.target.closest('.cart-item');
    const index = parseInt(itemElement.dataset.index, 10);
    if (!isNaN(index)) {
      removeFromCart(index);
    }
  }
});

const productsContainer = document.querySelector('.products');

productsContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' && e.target.hasAttribute('data-id')) {
    const productId = e.target.getAttribute('data-id');
    addToCart(productId);
  }
});

// Initialize
loadCart();
updateCartUI();
