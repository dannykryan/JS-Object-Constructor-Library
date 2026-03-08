const myLibrary = [];

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true, "https://covers.openlibrary.org/b/id/6979861-L.jpg");
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1178, false, "https://covers.openlibrary.org/b/id/15131000-L.jpg");
addBookToLibrary("The Silmarillion", "J.R.R. Tolkien", 365, false, "https://covers.openlibrary.org/b/id/6719384-L.jpg");

function Book(title, author, pages, read, coverUrl) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID(); // each book needs a unique id
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.coverUrl = coverUrl;

  Book.prototype.toggleRead = function() {
    this.read = !this.read;
  };
}

function addBookToLibrary(title, author, pages, read, coverUrl) {
  const book = new Book(title, author, pages, read, coverUrl);

  myLibrary.push(book);
}

function createBookCard(book) {
  const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.dataset.id = book.id;
    bookCard.innerHTML = `
      <img class="book-cover" src="${book.coverUrl}" alt="Book Cover">
      <h2>${book.title}</h2>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.read ? "Yes" : "No"}</p>
      <div class="read-checker">
        <label for="read">Read:</label>
        <input type="checkbox" id="read" data-book-id="${book.id}" name="read" ${book.read ? "checked" : ""}>
      </div>
      <button type="button" class="deleteBookButton" data-book-id="${book.id}">Delete</button>
      `;
  return bookCard;
};

const libraryContainer = document.getElementById("library");

function displayLibrary() {
  myLibrary.forEach((book) => {
    const bookCard = createBookCard(book);
    libraryContainer.appendChild(bookCard);
  });
};

displayLibrary();

// Add book form
const addBookForm = document.getElementById("addBookForm");
const submitButton = addBookForm.elements["submitButton"];

function deleteBook(bookId) {
  const bookIndex = myLibrary.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1);
  }
};

function updateReadStatus(bookId) {
  console.log(bookId);
  myLibrary.forEach((book) => {
    if (book.id === bookId) {
      book.read = !book.read;
    }
  });
};

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const title = addBookForm.elements["title"].value;
  const author = addBookForm.elements["author"].value;
  const pages = addBookForm.elements["pages"].value;
  const read = addBookForm.elements["read"].checked;
  const coverUrl = addBookForm.elements["coverUrl"].value;
  addBookToLibrary(title, author, pages, read, coverUrl);
  libraryContainer.innerHTML = "";
  displayLibrary();
});

libraryContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteBookButton")) {
    const bookId = e.target.dataset.bookId;
    deleteBook(bookId);
    libraryContainer.innerHTML = "";
    displayLibrary();
  }
});

libraryContainer.addEventListener("change", (e) => {
  if (e.target.matches('input[type="checkbox"][data-book-id]')) {
    const bookId = e.target.dataset.bookId;
    const book = myLibrary.find((book) => book.id === bookId);
    book.toggleRead();
  }
});


