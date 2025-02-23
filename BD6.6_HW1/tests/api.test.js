const request = require("supertest");
const { getAllMovies, getMovieById } = require("../controllers/index");
const http = require("http");
const { app } = require("../index");

jest.mock("../controllers/index", () => ({
  ...jest.requireActual("../controllers/index"),
  getAllMovies: jest.fn(),
  getMovieById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});
afterAll((done) => {
  server.close(done);
});

describe("API Endpoints testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and all movies list", async () => {
    let mockData = [
      {
        movieId: 1,
        title: "Inception",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
      },
      {
        movieId: 2,
        title: "The Shawshank Redemption",
        genre: "Drama",
        director: "Frank Darabont",
      },
      {
        movieId: 3,
        title: "The Godfather",
        genre: "Crime",
        director: "Francis Ford Coppola",
      },
    ];

    getAllMovies.mockReturnValue(mockData);

    let result = await request(server).get("/movies");

    expect(result.status).toEqual(200);
    expect(result.body.movies).toEqual(mockData);
    expect(getAllMovies).toHaveBeenCalled();
  });

  it("should return 200 and the movie by id", async () => {
    let mockData = {
      movieId: 2,
      title: "The Shawshank Redemption",
      genre: "Drama",
      director: "Frank Darabont",
    };

    getMovieById.mockReturnValue(mockData);

    let result = await request(server).get("/movies/details/2");

    expect(result.status).toEqual(200);
    expect(result.body.movie).toEqual(mockData);
    expect(getMovieById).toHaveBeenCalledWith(2);
  });
});

describe("Controller functions testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return list of all movies", () => {
    let mockData = [
      {
        movieId: 1,
        title: "Inception",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
      },
      {
        movieId: 2,
        title: "The Shawshank Redemption",
        genre: "Drama",
        director: "Frank Darabont",
      },
      {
        movieId: 3,
        title: "The Godfather",
        genre: "Crime",
        director: "Francis Ford Coppola",
      },
    ];

    getAllMovies.mockReturnValue(mockData);

    let result = getAllMovies();

    expect(result).toEqual(mockData);
    expect(getAllMovies).toHaveBeenCalled();
  });

  it("should return movie by id", () => {
    // let mockData = {
    //   movieId: 3,
    //   title: "The Godfather",
    //   genre: "Crime",
    //   director: "Francis Ford Coppola",
    // };
    // getMovieById.mockReturnValue(mockData);

    // let result = getMovieById(3);

    // expect(result).toEqual(mockData);

    let mockData = {
      movieId: 3,
      title: "The Godfather",
      genre: "Crime",
      director: "Francis Ford Coppola",
    };
    getMovieById.mockReturnValue(mockData);

    let result = getMovieById(3);

    expect(result).toEqual(mockData);
  });
});
