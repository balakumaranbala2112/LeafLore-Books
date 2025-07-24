let booksData = [];
const tabContent = document.getElementById("tab-content");
const tabButtons = document.querySelectorAll(".tab_btn");

// ✅ 1. Fetch JSON data
document.addEventListener("DOMContentLoaded", () => {
  fetch("../data/bestsellers.json") // ✅ Make sure the path is correct
    .then(res => res.json())
    .then(data => {
      booksData = data;
      renderBooks("new"); // Default to 'new'
    })
    .catch(err => console.error("Error loading books:", err));
});

// ✅ 2. Render filtered books
function renderBooks(category) {
  tabContent.innerHTML = ""; // Clear previous cards

  const filteredBooks = category === "all"
    ? booksData
    : booksData.filter(book => book.category.toLowerCase() === category.toLowerCase());

  filteredBooks.forEach(book => {
    const card = createCard(book);
    tabContent.appendChild(card);
  });
}

// ✅ 3. Create book card
function createCard(book) {
  const card = document.createElement("div");
  card.classList.add("book-card");

  card.innerHTML = `
    <div class="book-card__image">
      <img src="${book.image}" alt="${book.title}">
    </div>
    <div class="book-card__info">
      <p class="book-card__title">${book.title}</p>
      <p class="book-card__author">${book.author}</p>
    </div>
    <div class="book-card__price">
      <p>₹${book.price}</p>
      <p class="book-card__rating"><i class="fas fa-star"></i> ${book.rating} +</p>
    </div>
  `;

  return card;
}

// ✅ 4. Tab click events
tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".tab_btn.active")?.classList.remove("active");
    button.classList.add("active");

    const category = button.getAttribute("data-tab");
    renderBooks(category);
  });
});
