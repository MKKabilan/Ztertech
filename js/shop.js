console.log("JS Loaded");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  const products = [
    {
      id: "prod1",
      title: "Kaya Herbal Digestive Care",
      description: "Supports digestion with natural herbs.",
      price: 499,
      image: "images/products/1.png",
      variants: [
        { label: "250ml", price: 199 },
        { label: "500ml", price: 299 },
        { label: "1L", price: 499 },
      ],
    },
    {
      id: "prod2",
      title: "Organic Turmeric Powder",
      description: "100% natural turmeric for immunity and wellness.",
      price: 299,
      image: "images/products/turmeric.jpg",
    },
    {
      id: "prod3",
      title: "Natural Honey Jar",
      description: "Pure, raw honey harvested from organic farms.",
      price: 599,
      image: "images/products/honey.jpg",
    },
    {
      id: "prod4",
      title: "Ayurvedic Pain Relief Oil",
      description: "Relieves body pain with traditional herbal formula.",
      price: 699,
      image: "images/products/pain-relief-oil.jpg",
    },
  ];

  const productsContainer = document.querySelector(".products-container");
  const cartDrawer = document.getElementById("cart-drawer");
  const cartOverlay = document.getElementById("cart-overlay");
  const cartButton = document.getElementById("cart-button");
  const closeCartBtn = document.getElementById("close-cart");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElem = document.getElementById("cart-total");
  const cartCountElem = document.getElementById("cart-count");
  const checkoutBtn = document.getElementById("checkout-btn");

  if (!productsContainer) {
    console.error("Missing .products-container in HTML");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("kayaCart")) || {};

  function renderProducts() {
    productsContainer.innerHTML = products
      .map((p) => {
        const hasVariants = Array.isArray(p.variants) && p.variants.length > 0;
        return `
          <article class="product-card" aria-label="${p.title}">
            <img src="${p.image}" alt="${p.title}" class="product-image" loading="lazy" />
            <div class="product-info">
              <h3 class="product-title">${p.title}</h3>
              <p class="product-description">${p.description}</p>
  
              ${
                hasVariants
                  ? `
                <p><strong>Available in:</strong></p>
                <div class="variant-buttons" data-id="${p.id}">
                  ${p.variants
                    .map(
                      (v, i) =>
                        `<button type="button" class="variant-btn" data-index="${i}">${v.label}</button>`
                    )
                    .join("")}
                </div>
                `
                  : ""
              }
  
              <div class="product-price" id="price-${p.id}">Select a variant</div>
              <button class="add-to-cart-btn" data-id="${p.id}">Add to Cart</button>
            </div>
          </article>`;
      })
      .join("");
  }  
  
// 1. Handle variant button clicks: change selected style, show price
productsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("variant-btn")) {
    const btn = e.target;
    const variantButtonsWrapper = btn.closest(".variant-buttons");
    const productId = variantButtonsWrapper.getAttribute("data-id");
    const product = products.find((p) => p.id === productId);
    const variantIndex = btn.getAttribute("data-index");

    // Style selected variant
    variantButtonsWrapper.querySelectorAll(".variant-btn").forEach((b) =>
      b.classList.remove("active")
    );
    btn.classList.add("active");

    // Show updated price
    const selectedVariant = product.variants[variantIndex];
    const priceElem = document.getElementById(`price-${productId}`);
    if (priceElem) {
      priceElem.textContent = `₹${selectedVariant.price.toFixed(2)}`;
    }

    // Save selected index
    variantButtonsWrapper.setAttribute("data-selected-index", variantIndex);
  }
});

// 2. Handle Add to Cart button click
productsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const id = e.target.getAttribute("data-id");
    const product = products.find((p) => p.id === id);

    let price, label;
    let variantKey = id;

    if (product.variants) {
      const variantButtons = document.querySelector(`.variant-buttons[data-id="${id}"]`);
      const selectedIndex = variantButtons?.getAttribute("data-selected-index");

      if (selectedIndex == null) {
        alert("Please select a variant first.");
        return;
      }

      const selectedVariant = product.variants[selectedIndex];
      price = selectedVariant.price;
      label = selectedVariant.label;
      variantKey = `${id}-${label}`;
    } else {
      price = product.price;
      label = "";
    }

    if (cart[variantKey]) {
      cart[variantKey].quantity++;
    } else {
      cart[variantKey] = {
        id: variantKey,
        title: label ? `${product.title} (${label})` : product.title,
        image: product.image,
        price,
        quantity: 1,
      };
    }

    saveCart();
    updateCartCount();
    renderCart();
    openCart();
  }
});

  function saveCart() {
    localStorage.setItem("kayaCart", JSON.stringify(cart));
  }

  function calculateTotal() {
    return Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  function updateCartCount() {
    const totalQty = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountElem) {
      cartCountElem.textContent = totalQty;
    }
  }

  function renderCart() {
    if (!cartItemsContainer || !cartTotalElem) return;

    if (Object.keys(cart).length === 0) {
      cartItemsContainer.innerHTML = `<p>Your cart is empty.</p>`;
      cartTotalElem.textContent = "0.00";
      return;
    }

    cartItemsContainer.innerHTML = Object.values(cart)
      .map(
        (item) => `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.title}" />
          <div class="cart-item-info">
            <p class="cart-item-title">${item.title}</p>
            <p class="cart-item-qty">Quantity: ${item.quantity}</p>
          </div>
          <div class="cart-item-price">₹${(item.price * item.quantity).toFixed(2)}</div>
          <button class="cart-item-remove" aria-label="Remove ${item.title} from cart">&times;</button>
        </div>
      `
      )
      .join("");

    cartTotalElem.textContent = calculateTotal().toFixed(2);
  }

  function addToCart(id) {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    let price, variantLabel;
    const selectEl = document.querySelector(`.variant-select[data-id="${id}"]`);
    if (product.variants && selectEl) {
      const variantIndex = selectEl.value;
      const variant = product.variants[variantIndex];
      price = variant.price;
      variantLabel = variant.label;
    } else {
      price = product.price;
      variantLabel = "";
    }

    const variantKey = variantLabel ? `${id}-${variantLabel}` : id;

    if (cart[variantKey]) {
      cart[variantKey].quantity++;
    } else {
      cart[variantKey] = {
        id: variantKey,
        title: variantLabel ? `${product.title} (${variantLabel})` : product.title,
        image: product.image,
        price,
        quantity: 1,
      };
    }

    saveCart();
    updateCartCount();
    renderCart();
  }

  function removeFromCart(id) {
    if (!cart[id]) return;
    delete cart[id];
    saveCart();
    updateCartCount();
    renderCart();
  }

  function openCart() {
    if (!cartDrawer || !cartOverlay) return;
    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");
    cartDrawer.setAttribute("aria-hidden", "false");
    cartDrawer.focus();
  }

  function closeCart() {
    if (!cartDrawer || !cartOverlay) return;
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");
    cartDrawer.setAttribute("aria-hidden", "true");
  }

  // Event Listeners
  productsContainer.addEventListener("change", (e) => {
    if (e.target.classList.contains("variant-select")) {
      const id = e.target.getAttribute("data-id");
      const selectedIndex = e.target.value;
      const product = products.find((p) => p.id === id);
      const variant = product.variants[selectedIndex];
      document.getElementById(`price-${id}`).textContent = `₹${variant.price.toFixed(2)}`;
    }
  });

  productsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart-btn")) {
      const id = e.target.getAttribute("data-id");
      addToCart(id);
    }
  });

  if (cartItemsContainer) {
    cartItemsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("cart-item-remove")) {
        const cartItem = e.target.closest(".cart-item");
        if (!cartItem) return;
        const id = cartItem.getAttribute("data-id");
        removeFromCart(id);
      }
    });
  }

  if (cartButton) cartButton.addEventListener("click", () => { renderCart(); openCart(); });
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (Object.keys(cart).length === 0) {
        alert("Your cart is empty.");
        return;
      }
      alert("Thank you for your purchase! We will contact you soon to process your order.");
      cart = {};
      saveCart();
      updateCartCount();
      renderCart();
      closeCart();
    });
  }

  // Initial render
  renderProducts();
  updateCartCount();
});
