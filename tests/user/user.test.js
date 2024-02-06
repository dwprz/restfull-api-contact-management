import supertest from "supertest";
import app from "../../src/applications/app.js";
import { utilUserTest } from "./util.js";
import { logger } from "../../src/applications/logging.js";
import bcrypt from "bcrypt";

describe("POST /api/users", function () {
  //
  afterEach(async () => await utilUserTest.remove());

  it("have to create a new user", async () => {
    const result = await supertest(app).post("/api/users").send({
      username: "kongleong poseidon",
      password: "12345678",
      name: "kongleong",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("kongleong poseidon");
    expect(result.body.data.name).toBe("kongleong");
    expect(result.body.data.password).toBeUndefined();
  });

  it("must be rejected if the request is invalid", async () => {
    const result = await supertest(app).post("/api/users").send({
      username: "true?'Hello world': 'hello'",
      password: "true?'Hello world': 'hello'",
      name: "true?'Hello world': 'hello'",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should be rejected if the user already exists", async () => {
    let result = await supertest(app).post("/api/users").send({
      username: "kongleong poseidon",
      password: "12345678",
      name: "kongleong",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("kongleong poseidon");
    expect(result.body.data.name).toBe("kongleong");
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(app).post("/api/users").send({
      username: "kongleong poseidon",
      password: "12345678",
      name: "kongleong",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("POST /api/users/login", function () {
  //
  beforeEach(async () => await utilUserTest.create());

  afterEach(async () => await utilUserTest.remove());

  it("must be successful if the user has registered", async () => {
    const result = await supertest(app).post("/api/users/login").send({
      username: "kongleong poseidon",
      password: "12345678",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
  });

  it("should fail if the user has not registered", async () => {
    const result = await supertest(app).post("/api/users/login").send({
      username: "not registered",
      password: "not registered",
    });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it("should fail if input is invalid", async () => {
    const result = await supertest(app).post("/api/users/login").send({
      username: "hello`; DROP TABLE users; #",
      password: "wrong password",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should fail if the password is wrong", async () => {
    const result = await supertest(app).post("/api/users/login").send({
      username: "kongleong poseidon",
      password: "wrong password",
    });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it("should fail if the username is wrong", async () => {
    const result = await supertest(app).post("/api/users/login").send({
      username: "wrong username",
      password: "12345678",
    });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/users/current", function () {
  //
  beforeEach(async () => await utilUserTest.create());

  afterEach(async () => await utilUserTest.remove());

  it("must successfully get the username", async () => {
    const result = await supertest(app)
      .get("/api/users/current")
      .set("Authorization", "example");

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("kongleong poseidon");
    expect(result.body.data.name).toBe("kongleong");
  });

  it("should fail if authorization is incorrect", async () => {
    const result = await supertest(app)
      .get("/api/users/current")
      .set("Authorization", "wrong authorization");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PATCH /api/users/current", function () {
  //
  beforeEach(async () => await utilUserTest.create());

  afterEach(async () => await utilUserTest.remove());

  it("must successfully update the name", async () => {
    const result = await supertest(app)
      .patch("/api/users/current")
      .send({
        name: "new name",
      })
      .set("Authorization", "example");

    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe("new name");
  });

  it("must successfully update the password", async () => {
    const result = await supertest(app)
      .patch("/api/users/current")
      .send({
        password: "new password",
      })
      .set("Authorization", "example");

    expect(result.status).toBe(200);
    const { password } = await utilUserTest.get();
    expect(await bcrypt.compare("new password", password)).toBe(true);
  });

  it("should fail if password is invalid", async () => {
    const result = await supertest(app)
      .patch("/api/users/current")
      .send({
        password: " ",
      })
      .set("Authorization", "example");

    expect(result.status).toBe(400);
    const { password } = await utilUserTest.get();
    expect(await bcrypt.compare(" ", password)).toBe(false);
  });

  it("should fail if name is invalid", async () => {
    const result = await supertest(app)
      .patch("/api/users/current")
      .send({
        name: " ",
      })
      .set("Authorization", "example");

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/users/logout", function () {
  //
  beforeEach(async () => await utilUserTest.create());

  afterEach(async () => await utilUserTest.remove());

  it("should successfully logout the user", async () => {
    const result = await supertest(app)
      .delete("/api/users/logout")
      .set("Authorization", "example");

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("kongleong poseidon");
  });

  it("should fail if authorization is invalid", async () => {
    const result = await supertest(app)
      .delete("/api/users/logout")
      .set("Authorization", " ");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});
