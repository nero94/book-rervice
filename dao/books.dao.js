const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const { BOOKS_TABLE } = process.env;
const options = {};
const client = new AWS.DynamoDB.DocumentClient(options);

const createBook = (book) => {
  const params = {
    TableName: BOOKS_TABLE,
    Item: book,
  };
  return client.put(params).promise();
};

const updateBook = ({ uuid, data }) => {
  const params = {
    TableName: process.env.BOOKS_TABLE,
    Key: {
      uuid,
    },
    ExpressionAttributeNames: {
      '#name': 'name',
      '#releaseDate': 'releaseDate',
      '#authorName': 'authorName',
    },
    ExpressionAttributeValues: {
      ':name': data.name,
      ':releaseDate': data.releaseDate,
      ':authorName': data.authorName,
    },
    UpdateExpression: 'SET #name = :name, #releaseDate = :releaseDate, #authorName = :authorName',
    ReturnValues: 'ALL_NEW',
  };
  return client.update(params).promise();
};

const deleteBook = (uuid) => {
  const params = {
    TableName: process.env.BOOKS_TABLE,
    Key: {
      uuid,
    },
  };
  return client.delete(params).promise();
};

const getAllBooks = () => {
  const params = {
    TableName: BOOKS_TABLE,
  };
  return client.scan(params).promise();
};

const getBookByUuid = (uuid) => {
  const params = {
    TableName: BOOKS_TABLE,
    Key: {
      uuid,
    },
  };
  return client.get(params).promise();
};

module.exports = {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
  getBookByUuid,
};
