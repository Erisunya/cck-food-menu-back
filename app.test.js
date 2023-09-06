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

describe("GET /feedback/:id", () => {
  it("should return 200", async () => {
    const response = await request(app).get("/feedback/Test ID");
    expect(response.status).toEqual(200);
  });

  it("should return JSON", async () => {
    const response = await request(app).get("/feedback/Test ID");
    expect(response.type).toEqual("application/json");
  });

  it("should return a JSON containing the feedback", async () => {
    const response = await request(app).get("/feedback/Test ID");
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toBe("Test Name");
    expect(response.body).toHaveProperty("email");
    expect(response.body.email).toBe("Test Email");
    expect(response.body).toHaveProperty("telegramHandle");
    expect(response.body.telegramHandle).toBe("Test Handle");
    expect(response.body).toHaveProperty("feedback");
    expect(response.body.feedback).toBe("Test Feedback");
  });
});

describe("DELETE /feedback/:id", () => {
  const feedback = {
    id: "DELETE Test ID",
    name: "DELETE Test Name",
    email: "DELETE Test Email",
    telegramHandle: "DELETE Test Handle",
    feedback: "DELETE Test Feedback",
  };

  beforeEach(async () => {
    await request(app).post("/feedback").send(feedback);
  });

  it("should return 200", async () => {
    const response = await request(app).delete("/feedback/DELETE Test ID");
    expect(response.status).toEqual(200);
  });

  it("should delete a document from the Feedback collection", async () => {
    const deleteResponse = await request(app).delete(
      "/feedback/DELETE Test ID"
    );
    expect(deleteResponse.status).toEqual(200);
    expect(deleteResponse.body.isDeleted).toBeTruthy();
    const getResponse = await request(app).get("/feedback/DELETE Test ID");
    console.log(getResponse.body);
    expect(getResponse.status).toEqual(404);
  });
});

describe("POST /feedback", () => {
  const feedback = {
    id: "POST Test ID",
    name: "POST Test Name",
    email: "POST Test Email",
    telegramHandle: "POST Test Handle",
    feedback: "POST Test Feedback",
  };

  afterEach(async () => {
    await request(app).delete("/feedback/POST Test ID");
  });

  it("should return 201", async () => {
    const response = await request(app).post("/feedback").send(feedback);
    expect(response.status).toEqual(201);
  });

  it("should add a document to the Feedback collection", async () => {
    let postResponse = await request(app).post("/feedback").send(feedback);
    expect(postResponse.status).toEqual(201);
    let getResponse = await request(app).get("/feedback/POST Test ID");
    expect(getResponse.body.name).toBe("POST Test Name");
    expect(getResponse.body.email).toBe("POST Test Email");
    expect(getResponse.body.telegramHandle).toBe("POST Test Handle");
    expect(getResponse.body.feedback).toBe("POST Test Feedback");
  });
});
