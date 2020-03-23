const { v1: getV1Uuid } = require('uuid');
const schema = require('./book.schema');
const bookService = require('../services/books.service');
const buildErrorResponse = require('../common/buildErrorResponse');
const buildSuccessResponse = require('../common/buildSuccessResponse');

const createBook = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  const uuid = getV1Uuid();
  const book = { ...data, uuid };

  try {
    await schema.validateAsync(book);
  } catch (err) {
    console.error('Book validation failed');
    return callback(null, buildErrorResponse(err, 400));
  }

  try {
    await bookService.createBook(book);
    console.log('Book saved successfully', { book });
    return callback(null, buildSuccessResponse(book));
  } catch (err) {
    console.error('Book saving failed');
    return callback(null, buildErrorResponse(err, err.statusCode || 500));
  }
};

const updateBook = async (event, context, callback) => {
  const { uuid } = event.pathParameters;
  const data = JSON.parse(event.body);

  try {
    await schema.validateAsync({ ...data, uuid });
  } catch (err) {
    console.error('Book update validation failed');
    return callback(null, buildErrorResponse(err, 400));
  }

  try {
    const result = await bookService.updateBook({ uuid, data });
    console.log('Book updated successfully', { data });
    return callback(null, buildSuccessResponse(result));
  } catch (err) {
    console.error('Book update failed');
    return callback(null, buildErrorResponse(err, err.statusCode || 500));
  }
};

const deleteBook = async (event, context, callback) => {
  const { uuid } = event.pathParameters;

  try {
    const result = await bookService.deleteBook(uuid);
    callback(null, buildSuccessResponse(result));
    console.log('Book deleted successfully', { uuid });
  } catch (err) {
    console.error('Book deleting failed');
    callback(null, buildErrorResponse(err, err.statusCode || 500));
  }
};

const getAllBooks = async (event, context, callback) => {
  try {
    const books = await bookService.getAllBooks();
    callback(null, buildSuccessResponse(books));
    console.log('Got list of books successfully', { books });
  } catch (err) {
    console.error('Get list of books failed');
    callback(null, buildErrorResponse(err, err.statusCode || 500));
  }
};

const getBook = async (event, context, callback) => {
  const { uuid } = event.pathParameters;

  try {
    const books = await bookService.getBookByUuid(uuid);
    callback(null, buildSuccessResponse(books));
    console.log('Book got successfully', { uuid });
  } catch (err) {
    console.error('Get book failed');
    callback(null, buildErrorResponse(err, err.statusCode || 500));
  }
};

module.exports = {
  createBook,
  getAllBooks,
  updateBook,
  getBook,
  deleteBook,
};
