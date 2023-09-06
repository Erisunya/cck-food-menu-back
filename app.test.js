require("dotenv").config();
const request = require("supertest");
const assert = require("assert");
const express = require("express");
const app = express();
// const baseURL = `http://localhost:${process.env.PORT}`;

app.use(express.urlencoded({ extended: true }));
app.use("/", require("./app.js"));

describe("GET /places", () => {
  it("should return 200", async () => {
    const response = await request(app).get("/places");
    expect(response.status).toEqual(200);
  });

  it("should return JSON", async () => {
    const response = await request(app).get("/places");
    expect(response.type).toEqual("application/json");
  });

  it("should return a JSON containing the names of all the collections", async () => {
    const response = await request(app).get("/places");
    expect(response.body).toHaveProperty("places");
    expect(response.body.places).toContain("testCollection");
  });
});

describe("GET /places/:placename", () => {
  it("should return 200", async () => {
    const response = await request(app).get("/places/testCollection");
    expect(response.status).toEqual(200);
  });

  it("should return JSON", async () => {
    const response = await request(app).get("/places/testCollection");
    expect(response.type).toEqual("application/json");
  });

  it("should return a JSON containing the names of stalls in the collection", async () => {
    const response = await request(app).get("/places/testCollection");
    expect(response.body).toHaveProperty("Test Stall 1");
    expect(response.body).toHaveProperty("Test Stall 2");
    expect(response.body["Test Stall 1"]).toContain("Test Link 1");
    expect(response.body["Test Stall 2"]).toContain("Test Link 2");
  });
});

describe("GET /places/:placename/:stallname", () => {
  it("should return 200", async () => {
    const response = await request(app).get(
      "/places/testCollection/Test Stall 1"
    );
    expect(response.status).toEqual(200);
  });

  it("should return JSON", async () => {
    const response = await request(app).get(
      "/places/testCollection/Test Stall 1"
    );
    expect(response.type).toEqual("application/json");
  });

  it("should return a JSON containing information about the stall", async () => {
    const response = await request(app).get(
      "/places/testCollection/Test Stall 1"
    );
    expect(response.body).toHaveProperty("stall");
    expect(response.body.stall).toBe("Test Stall 1");

    expect(response.body).toHaveProperty("images");
    expect(response.body.images).toContain("Test Link 1");

    expect(response.body).toHaveProperty("halal");
    expect(response.body.halal).toBe("T");
  });
});
