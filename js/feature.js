  const products = [
    {
      title: "Kaya's Digestive Care",
      subtitle: "Best for your gut health!",
      image: "images/features/Digestive_Care.png",
      link: "shop.html"
    },
    {
      title: "Kaya's Coconut Oil",
      subtitle: "Extra Virgin Coconut oil",
      image: "images/features/Coconut_Oil.png",
      link: "shop.html"
    },
    {
      title: "Kaya's Seeraga Mittai",
      subtitle: "Orignal Seeraga Mittai",
      image: "images/features/Coconut_Oil.png",
      link: "shop.html"
    }
  ];

  const container = document.getElementById("product-section");

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "feature-card";
    card.style.backgroundImage = `url('${product.image}')`;

    card.innerHTML = `
      <div class="feature-text">
        <h2>${product.title}</h2>
        <p>${product.subtitle}</p>
        ${product.bottleImage ? `<img src="${product.bottleImage}" alt="${product.title}" class="product-img" />` : ''}
        <a href="${product.link}" class="shop-now-btn">Shop Now</a>
      </div>
    `;

    container.appendChild(card);
  });