const books = [
  {
    bookId: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
  },
  {
    bookId: 2,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
  },
  {
    bookId: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
  },
];

const getAllBooks = () => {
  return books;
};

const getBookById = (id) => {
  let book = books.find((book) => book.bookId === id);
  return book;
};

module.exports = { getAllBooks, getBookById };
