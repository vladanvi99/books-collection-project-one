const addBtn = document.querySelector('.add');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');

console.log(bookAuthor);
const bookCollection = {
  books: []
};



function addBook() {
  console.log("Calling");
  bookCollection.books.push({ title: bookTitle.value, author: bookAuthor.value });
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem('bookCollection', JSON.stringify(bookCollection));

}





addBtn.addEventListener('click', () => addBook());