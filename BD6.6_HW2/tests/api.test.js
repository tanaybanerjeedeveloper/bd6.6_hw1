const request = require("supertest");
const http = require("http");
const { app } = require("../index");
const { getAllGames, getGameById } = require("../controllers/index");

jest.mock("../controllers/index", () => ({
  ...jest.requireActual("../controllers/index"),
  getAllGames: jest.fn(),
  getGameById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoint testing", () => {
  it("should return 200 and list of all games", async () => {
    let mockData = [
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
      {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
      },
      {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    ];
    getAllGames.mockReturnValue(mockData);

    let result = await request(server).get("/games");

    expect(result.status).toEqual(200);
    expect(result.body.games).toEqual(mockData);
    expect(getAllGames).toHaveBeenCalled();
  });

  it("should return 200 and a game by id", async () => {
    let mockData = {
      gameId: 3,
      title: "The Witcher 3: Wild Hunt",
      genre: "RPG",
      platform: "PC",
    };
    getGameById.mockReturnValue(mockData);

    let result = await request(server).get("/games/details/3");

    expect(result.status).toEqual(200);
    expect(result.body.game).toEqual(mockData);
    expect(getGameById).toHaveBeenCalledWith(3);
  });
});
