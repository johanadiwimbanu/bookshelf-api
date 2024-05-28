const {
  addBooksHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookById,
  deleteBookByIdHandler,
} = require('./handler');

const routes = [
  {
    path: '/books',
    method: 'POST',
    handler: addBooksHandler,
  },
  {
    path: '/books',
    method: 'GET',
    handler: getAllBooksHandler,
  },
  {
    path: '/books/{id}',
    method: 'GET',
    handler: getBookByIdHandler,
  },
  {
    path: '/books/{id}',
    method: 'PUT',
    handler: updateBookById,
  },
  {
    path: '/books/{id}',
    method: 'DELETE',
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
