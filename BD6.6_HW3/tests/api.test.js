const request = require("supertest");
const http = require("http");
const { app } = require("../index");
const { getAllBooks, getBookById } = require("../controllers/index");

jest.mock("../controllers/index", () => ({
  ...jest.requireActual("../controllers/index"),
  getAllBooks: jest.fn(),
  getBookById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3000, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoint testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and a list of all books", async () => {
    let mockData = [
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
    getAllBooks.mockReturnValue(mockData);

    let result = await request(server).get("/books");

    expect(result.status).toEqual(200);
    expect(result.body.books).toEqual(mockData);
    expect(getAllBooks).toHaveBeenCalled();
  });

  it("should return 200 and a book by id", async () => {
    let mockData = {
      bookId: 3,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic",
    };
    getBookById.mockReturnValue(mockData);

    let result = await request(server).get("/books/details/3");

    expect(result.status).toEqual(200);
    expect(result.body.book).toEqual(mockData);
    expect(getBookById).toHaveBeenCalledWith(3);
  });
});
