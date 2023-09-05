require("dotenv").config();
const request = require("supertest");
const express = require("express");
const app = express();
// const baseURL = `http://localhost:${process.env.PORT}`;

app.use(express.urlencoded({ extended: true }));

describe("GET /places", () => {
  it("should return 200", () => {
    request(app).get("/places").expect(200);
  });

  it("should return JSON", async () => {
    request(app).get("/places").expect("Content-Type", /json/);
  });

  it("should return a JSON containing the names of all the collections", async () => {
    request(app)
      .get("/places")
      .expect((res) => {
        res.body.should.have.property("names");
      });
  });
});
