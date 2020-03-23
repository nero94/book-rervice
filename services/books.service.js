const booksDao = require('../dao/books.dao');

const createBook = (book) => booksDao.createBook(book);

const updateBook = ({ uuid, data }) => booksDao.updateBook({ uuid, data });

const deleteBook = (uuid) => booksDao.deleteBook(uuid);

const getAllBooks = () => booksDao.getAllBooks();

const getBookByUuid = (uuid) => booksDao.getBookByUuid(uuid);

module.exports = {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
  getBookByUuid,
};
