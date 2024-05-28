const { addBooksHandler } = require('./handler');

const routes = [
  {
    path: '/books',
    method: 'POST',
    handler: addBooksHandler,
  },
  {
    path: '/books',
    method: 'GET',
    handler: (request, h) => {
      return 'get books';
    },
  },
  {
    path: '/books/{id}',
    method: 'GET',
    handler: (request, h) => {
      return 'get books by id';
    },
  },
  {
    path: '/books/{id}',
    method: 'PUT',
    handler: (request, h) => {
      return 'update books by id';
    },
  },
  {
    path: '/books/{id}',
    method: 'DELETE',
    handler: (request, h) => {
      return 'delete books by id';
    },
  },
];

module.exports = routes;
