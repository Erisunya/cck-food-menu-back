require("dotenv").config();
const request = require("supertest");
const baseURL = `http://localhost:${process.env.PORT}`;

describe("GET /places", () => {
  it("should return 200", async () => {
    const response = await request(baseURL).get("/places");
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(null);
  });
});
