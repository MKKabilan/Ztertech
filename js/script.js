// Newsletter form handling (dynamic interaction)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".newsletter-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const emailInput = form.querySelector("input[type='email']");
    const email = emailInput.value.trim();
    if (email && email.includes("@")) {
      alert(`Thanks for subscribing, ${email}!`);
      emailInput.value = "";
    } else {
      alert("Please enter a valid email address.");
    }
  });

  // Dynamic Navigation Highlight
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".top-nav a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});
const header = document.querySelector(".main-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});