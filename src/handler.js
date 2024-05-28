const { nanoid } = require('nanoid');
const books = require('./books');

const addBooksHandler = (request, h) => {
  const id = nanoid(16);
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBooks);

  const isSuccess = books.filter((book) => book.id === id);

  if (!isSuccess) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
  }

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  });
  response.code(201);
  return response;
};

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  const booksData = [...books];

  if (name !== '') {
    booksData.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (reading !== '') {
    booksData.filter((book) => book.reading === !!parseInt(reading));
  }

  if (finished !== '') {
    booksData.filter((book) => book.finished === !!parseInt(finished));
  }

  booksData.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));
  return {
    status: 'success',
    data: {
      books: booksData,
    },
  };
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const book = books.filter((book) => book.id === id)[0];

  if (!book) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  return {
    status: 'success',
    data: {
      book,
    },
  };
};

const updateBookById = (request, h) => {
  const { id } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  const newBookData = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    updatedAt,
  };

  books[bookIndex] = {
    ...books[bookIndex],
    ...newBookData,
  };

  return {
    status: 'success',
    message: 'Buku berhasil diperbarui',
  };
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const bookIndex = books.findIndex((book) => book.id === id);

  books.splice(bookIndex, 1);

  if (bookIndex !== -1) {
    return {
      status: 'success',
      message: 'Buku berhasil dihapus',
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBooksHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookById,
  deleteBookByIdHandler,
};
