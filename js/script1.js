// Testimonial Data
const testimonials = [
  {
    name: "Google",
    img: "images/review/custmoer.png",
    text: "We’ve been using Kaya’s Digestive Care... finally feeling well! Good gut ‘normal’ after meals.",
    stars: 5
  },
  {
    name: "Instagram",
    img: "images/review/custmoer.png",
    text: "Thank you Kaya Digestive Care! எனக்கு தினமும் வாயுவும் பிரச்சனையும் இருந்தது. இப்போ சூப்பராக இருக்கேன்!",
    stars: 5
  },
  {
    name: "Facebook",
    img: "images/review/custmoer.png",
    text: "Kaya's products changed my life. Stomach issues gone, mood better. Highly recommended!",
    stars: 5
  }
];

// Render testimonials
const container = document.getElementById("testimonialList");
testimonials.forEach((item, i) => {
  const card = document.createElement("div");
  card.className = "testimonial-card";
  card.style.animationDelay = `${i * 0.2}s`;
  card.innerHTML = `
    <img src="${item.img}" alt="Customer ${i + 1}" class="testimonial-photo" />
    <p class="testimonial-text">&ldquo;${item.text}&rdquo;</p>
    <div class="testimonial-stars">${"★".repeat(item.stars)}</div>
    <p class="testimonial-author"><strong>${item.name}</strong></p>
  `;
  container.appendChild(card);
});

// Dark Mode Toggle
document.getElementById("toggle-dark").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

