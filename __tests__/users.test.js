import app from "../app.js";
import request from "supertest";

describe("GET /users", () => {
  it("Should return 200 to get all users", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
  });
});

describe("GET /users/:id", () => {
  it("Should return 200 to get a user by ID", async () => {
    const response = await request(app).get("/users/1");
    expect(response.status).toBe(200);
  });
  it("Should return 404 if user not exist", async () => {
    const response = await request(app).get("/users/213");
    expect(response.status).toBe(404);
  });
});

describe("POST /users", () => {
  it("Should return 201 when creating a user", async () => {
    const response = await request(app)
      .post("/users")
      .send({ firstName: "John", lastName: "Doe", age: 12 });
    expect(response.status).toBe(201);
  });
  it("Should return 400 if a user property is missing", async () => {
    const response = await request(app)
      .post("/users")
      .send({ lastName: "Doe", age: 12 });
    expect(response.status).toBe(400);
  });
});

describe("PATCH /users/:id", () => {
  it("Should return 200 when updating a user", async () => {
    const response = await request(app)
      .patch("/users/1")
      .send({ lastName: "Doe", age: 12 });
    expect(response.status).toBe(200);
  });
  it("Should return 400 when the user did not supply a property to update", async () => {
    const response = await request(app).patch("/users/1").send({});
    expect(response.status).toBe(400);
  });
  it("Should return 404 when the user to update not found", async () => {
    const response = await request(app)
      .patch("/users/213")
      .send({ lastName: "Doe", age: 12 });
    expect(response.status).toBe(404);
  });
});

describe("DELETE /users/:id", () => {
  it("Should return 200 when deleting a user", async () => {
    const response = await request(app).delete("/users/1");
    expect(response.status).toBe(200);
  });
  it("Should return 404 when the user to delete not found", async () => {
    const response = await request(app)
      .delete("/users/213")
      .send({ lastName: "Doe", age: 12 });
    expect(response.status).toBe(404);
  });
});
