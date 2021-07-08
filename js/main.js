/* eslint-disable max-classes-per-file */
document.addEventListener('DOMContentLoaded', () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let removeBtn = [];
  const mainWrap = document.querySelector('main.our-content');

  class Screens {
    screens = [
      `<div class="book-list main-content display-page">
                  <h1>All Awesome Books</h1>
                  <ul class="book-ul">
                  </ul>
                </div>`,
      `<div class="add-new main-content">
                  <form>
                    <input type="text" id="title" placeholder="title" required minlength="3">
                    <input type="text" id="author" placeholder="author" required minlength="3">
                    <button class="add">Add</button>
                  </form>
                </div>`,
      `<div class="contact-info main-content">
                  <h1>Contact Information</h1>
                  <div class="contact">
                    <p>Do you have any questions or just want to say hello?
                      <span>You can reach out to us!</span>
                    </p>
                    <ul>
                      <li>our email mail@email.com</li>
                      <li>our phone number: 004354345345234</li>
                      <li>our address: Streetname 22, 84604 City,Country
                      </li>
                    </ul>
                  </div>
                </div>`
    ]
  }

  const screens = new Screens();
  screens.screens.forEach((screen) => {
    mainWrap.innerHTML += screen;
  })
  const bookListWrap = document.querySelector('.book-ul');
  const addBtn = document.querySelector('.add');
  const bookTitle = document.getElementById('title');
  const bookAuthor = document.getElementById('author');
  class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }
  }

  class Collection {
    booksCollection = {
      books: [],
    }

    // IMPLEMENT BOOKS
    implementBooks = () => {
      bookListWrap.innerHTML = '';
      this.booksCollection.books.forEach((book, index) => {
        bookListWrap.innerHTML += `<li>
            <div class="book-info">
              <p><span class="book-title">"${book.title}"</span> by <span class="book-author">${book.author}</span></p>
            </div>
            <button type="button" class="removeBtn" data-key=${index}>Remove</button>
          </li>`;
      });
    }

    // GET BOOKS FROM LOCAL STORAGE
    getBooksFromLocalStorage = () => {
      if (JSON.parse(localStorage.getItem('bookCollection'))) {
        this.booksCollection = JSON.parse(localStorage.getItem('bookCollection'));
      }
    }

    // UPDATE LOCAL STORE
    updateLocalStorage = () => {
      localStorage.setItem('bookCollection', JSON.stringify(this.booksCollection));
    }

    // ADD BOOK
    addBook = (e) => {
      if (bookTitle.value.length <= 2 || bookAuthor.value.length <= 2) {
        e.preventDefault();
      } else {
        this.booksCollection.books.push(new Book(bookTitle.value, bookAuthor.value));
        this.updateLocalStorage();
      }
    }

    // Remove the book
    removeBook = (btn) => {
      let { books } = this.booksCollection;
      books = books.filter((book, i) => i !== Number(btn.dataset.key));
      this.booksCollection.books = books;
      this.updateLocalStorage();
      this.getBooksFromLocalStorage();
      this.implementBooks();
      removeBtn = [...document.querySelectorAll('.removeBtn')];
      removeBtn.forEach((button) => button.addEventListener('click', () => this.removeBook(button)));
    }
  }

  const collection = new Collection();
  collection.getBooksFromLocalStorage();
  if (document.querySelector('.book-ul')) {
    collection.implementBooks();
  }
  removeBtn = [...document.querySelectorAll('.removeBtn')];
  if (document.querySelector('.add')) {
    addBtn.addEventListener('click', () => collection.addBook());
  }

  removeBtn.forEach((button) => button.addEventListener('click', () => {
    collection.removeBook(button);
  }));

  // IMPLEMENT TIME AND DATE
  const timeWrap = document.querySelector('.time-date p');

  function implementTime() {
    const time = new Date();
    timeWrap.innerHTML = `<span class="month">${months[time.getMonth()]}</span><span class="day">${time.getDate()}</span><span class="year">${time.getFullYear()}</span>${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}</span>`;
    setInterval(implementTime, 1000);
  }
  if (document.querySelector('.time-date p')) {
    implementTime();
  }
});