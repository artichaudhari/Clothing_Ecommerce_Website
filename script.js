// Navbar toggle for mobile
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active');
  });
}

if (close) {
  close.addEventListener('click', () => {
    nav.classList.remove('active');
  });
}

// ✅ Add to Cart
function addToCart(product) {
  fetch("http://localhost:8080/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  })
  .then(res => res.json())
  .then(data => {
    console.log("Added to cart:", data);
    alert("Added to cart: " + data.product.name + " x " + data.quantity);
    updateCartCount(); // 🔁 Call this to update cart count
  })
  .catch(err => {
    console.error("Error:", err);
    alert("Failed to add to cart.");
  });
}

// ✅ Update cart count
function updateCartCount() {
  fetch("http://localhost:8080/api/cart")
    .then(res => res.json())
    .then(cartItems => {
      const count = cartItems.reduce((total, item) => total + item.quantity, 0);
      const countSpan = document.getElementById("cart-count");
      if (countSpan) {
        countSpan.textContent = count;
      }
    })
    .catch(err => console.error("Cart count error:", err));
}

// ✅ Update cart count on page load
window.addEventListener("load", () => {
  updateCartCount();
});
