const addBtn = document.querySelector('.add');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookListWrap = document.querySelector('.book-ul');


let bookCollection = {
    books:[]
};
// GET BOOK COLLECTION FROM LOCALSTORAGE
function getBooksFromLocalStorage() {
    if(JSON.parse(localStorage.getItem('bookCollection'))) {
        bookCollection = JSON.parse(localStorage.getItem('bookCollection'));
        console.log(bookCollection)
    }
}
getBooksFromLocalStorage();
// IMPLEMENT BOOKS
function implementBooks() {
    bookCollection.books.forEach((book,index) => {
        bookListWrap.innerHTML += `<li>
        <div class="book-info">
          <p><span class="book-title">"${book.title}"</span> by <span class="book-author">${book.author}</span></p>
        </div>
        <button type="button" data-key=${index}>Remove</button>
      </li>`
    })
}
implementBooks();

// ADD BOOK
function addBook(e) {
    if (bookTitle.value.length <= 2 || bookAuthor.value.length <= 2) {
        e.preventDefault();
    } else {
        bookCollection.books.push({ title: bookTitle.value, author: bookAuthor.value });
        updateLocalStorage();
    }
}

function updateLocalStorage() {
  localStorage.setItem('bookCollection', JSON.stringify(bookCollection));

}

if (document.querySelector('.add')) {
    addBtn.addEventListener('click', (e) => addBook(e));
}