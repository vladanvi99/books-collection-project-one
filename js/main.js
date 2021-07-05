document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('.add');
  const bookTitle = document.getElementById('title');
  const bookAuthor = document.getElementById('author');
  const bookListWrap = document.querySelector('.book-ul');
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let bookCollection = {
    books: [],
  };
  // GET BOOK COLLECTION FROM LOCALSTORAGE
  function getBooksFromLocalStorage() {
    if (JSON.parse(localStorage.getItem('bookCollection'))) {
      bookCollection = JSON.parse(localStorage.getItem('bookCollection'));
    }
  }
  function updateLocalStorage() {
    localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
  }
  // TIME-DATE FUNCTION
  const timeWrap = document.querySelector('.time-date p');
  function implementTime() {
    const time = new Date();
    timeWrap.innerHTML = `<span class="month">${months[time.getMonth()]}</span><span class="day">${time.getDate()}</span><span class="year">${time.getFullYear()}</span>${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}</span>`;
    setInterval(implementTime, 1000);
  }
  if (document.querySelector('.time-date p')) {
    implementTime();
  }
  getBooksFromLocalStorage();
  // IMPLEMENT BOOKS
  function implementBooks() {
    bookListWrap.innerHTML = '';
    bookCollection.books.forEach((book, index) => {
      bookListWrap.innerHTML += `<li>
          <div class="book-info">
            <p><span class="book-title">"${book.title}"</span> by <span class="book-author">${book.author}</span></p>
          </div>
          <button type="button" class="removeBtn" data-key=${index}>Remove</button>
        </li>`;
    });
  }
  if (document.querySelector('.book-ul')) {
    implementBooks();
  }
  let removeBtn = [...document.querySelectorAll('.removeBtn')];
  // ADD BOOK
  function addBook(e) {
    if (bookTitle.value.length <= 2 || bookAuthor.value.length <= 2) {
      e.preventDefault();
    } else {
      bookCollection.books.push({ title: bookTitle.value, author: bookAuthor.value });
      updateLocalStorage();
    }
  }
  // Remove Book
  const removeBook = (btn) => {
    bookCollection.books = bookCollection.books.filter((book, i) => i !== Number(btn.dataset.key));
    updateLocalStorage();
    getBooksFromLocalStorage();
    implementBooks();
    removeBtn = [...document.querySelectorAll('.removeBtn')];
    removeBtn.forEach((button) => button.addEventListener('click', () => removeBook(button)));
  };
  if (document.querySelector('.add')) {
    addBtn.addEventListener('click', (e) => addBook(e));
  }
  removeBtn.forEach((button) => button.addEventListener('click', () => removeBook(button)));
});