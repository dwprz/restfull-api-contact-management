import supertest from "supertest";
import { utilContactTest } from "./util.js";
import app from "../../src/applications/app.js";
import { logger } from "../../src/applications/logging.js";
import { utilUserTest } from "../user/util.js";

// npx jest tests/contact/contact.test.js

describe("POST /api/contacts", function () {
  //
  beforeEach(async () => await utilUserTest.create());

  afterEach(async () => {
    await utilContactTest.remove();
    await utilUserTest.remove();
  });

  it("have to create a new contact", async () => {
    const result = await supertest(app)
      .post("/api/contacts")
      .set("Authorization", "example")
      .send({
        first_name: "kongleong",
        last_name: "poseidon",
        email: "kongleong@gmail.com",
        phone: "+62812345678",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.first_name).toBe("kongleong");
    expect(result.body.data.last_name).toBe("poseidon");
    expect(result.body.data.email).toBe("kongleong@gmail.com");
    expect(result.body.data.phone).toBe("+62812345678");
  });

  it("have to create a new contact", async () => {
    const result = await supertest(app)
      .post("/api/contacts")
      .set("Authorization", "example")
      .send({
        first_name: "kongleong",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.first_name).toBe("kongleong");
    expect(result.body.data.last_name).toBe(null);
    expect(result.body.data.email).toBe(null);
    expect(result.body.data.phone).toBe(null);
  });

  it("should fail if firstname is missing", async () => {
    const result = await supertest(app)
      .post("/api/contacts")
      .set("Authorization", "example")
      .send({
        last_name: "poseidon",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should fail if firstname is invalid", async () => {
    const result = await supertest(app)
      .post("/api/contacts")
      .set("Authorization", "example")
      .send({
        first_name: "hello; #",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should fail if there are additional properties", async () => {
    const result = await supertest(app)
      .post("/api/contacts")
      .set("Authorization", "example")
      .send({
        first_name: "kongleong",
        tambahan: "properti tambahan",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should fail if authorization is invalid", async () => {
    const result = await supertest(app)
      .post("/api/contacts")
      .set("Authorization", " ")
      .send({
        first_name: "kongleong",
      });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId", function () {
  //
  beforeEach(async () => {
    await utilUserTest.create();
    await utilContactTest.create();
  });

  afterEach(async () => {
    await utilContactTest.remove();
    await utilUserTest.remove();
  });

  it("should successful if params is valid", async () => {
    const contact = await utilContactTest.get();
    const result = await supertest(app)
      .get(`/api/contacts/${contact.id}`)
      .set("Authorization", "example");

    expect(result.status).toBe(200);
    expect(result.body.data.first_name).toBe("kongleong");
    expect(result.body.data.last_name).toBe("poseidon");
    expect(result.body.data.email).toBe("kongleong@gmail.com");
    expect(result.body.data.phone).toBe("0812345678");
  });

  it("should fail if params is invalid", async () => {
    const result = await supertest(app)
      .get(`/api/contacts/123invalid`)
      .set("Authorization", "example");

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PUT /api/contacts/:contactId", function () {
  //
  beforeEach(async () => {
    await utilUserTest.create();
    await utilContactTest.create();
  });

  afterEach(async () => {
    await utilContactTest.remove();
    await utilUserTest.remove();
  });

  it("should succesful if contactId & input is valid", async () => {
    const { id } = await utilContactTest.get();
    const result = await supertest(app)
      .put(`/api/contacts/${id}`)
      .set("Authorization", "example")
      .send({
        first_name: "new name",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.first_name).toBe("new name");
  });

  it("should succesful if contactId & input is valid", async () => {
    const { id } = await utilContactTest.get();
    const result = await supertest(app)
      .put(`/api/contacts/${id}`)
      .set("Authorization", "example")
      .send({
        first_name: "new name",
        phone: "+628123456789"
      });

    expect(result.status).toBe(200);
    expect(result.body.data.first_name).toBe("new name");
  });

  it("should fail if contactId is invalid", async () => {
    const result = await supertest(app)
      .put(`/api/contacts/123invalid`)
      .set("Authorization", "example")
      .send({
        first_name: "new name",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should fail if input without first_name", async () => {
    const { id } = await utilContactTest.get();
    const result = await supertest(app)
      .put(`/api/contacts/${id}`)
      .set("Authorization", "example")
      .send({
        phone: "+628123456789"
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/contacts/:contactId", function () {
  //
  beforeEach(async () => {
    await utilUserTest.create();
    await utilContactTest.create();
  });

  afterEach(async () => {
    await utilContactTest.remove();
    await utilUserTest.remove();
  });

  it("should succesful delete contact", async () => {
    const { id } = await utilContactTest.get();
    const result = await supertest(app)
      .delete(`/api/contacts/${id}`)
      .set("Authorization", "example");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    const contact = await utilContactTest.get();
    expect(contact).toBeNull();
  });

  it("should fail if contactId is invalid", async () => {
    const result = await supertest(app)
      .delete("/api/contacts/123invalid")
      .set("Authorization", "example");

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should fail if contact is not found", async () => {
    const result = await supertest(app)
      .delete("/api/contacts/1")
      .set("Authorization", "example");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts", function () {
  //
  beforeEach(async () => {
    await utilUserTest.create();
    await utilContactTest.createMany();
  });

  afterEach(async () => {
    await utilContactTest.remove();
    await utilUserTest.remove();
  });

  it("should successful search contact", async () => {
    const result = await supertest(app)
      .get("/api/contacts")
      .set("Authorization", "example");

    expect(result.status).toBe(200);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_item).toBe(15);
    expect(result.body.paging.total_page).toBe(2);
  });

  it("should successful if query name is valid", async () => {
    const result = await supertest(app)
      .get("/api/contacts")
      .query({ name: "kongleong1" })
      .set("Authorization", "example");

    expect(result.status).toBe(200);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_item).toBe(7);
    expect(result.body.paging.total_page).toBe(1);
  });

  it("should successful if query email is valid", async () => {
    const result = await supertest(app)
      .get("/api/contacts")
      .query({ email: "kongleong1@gmail.com" })
      .set("Authorization", "example");

    expect(result.status).toBe(200);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_item).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
  });

  it("should successful if query phone is valid", async () => {
    const result = await supertest(app)
      .get("/api/contacts")
      .query({ phone: "+6281234567" })
      .set("Authorization", "example");

    expect(result.status).toBe(200);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_item).toBe(15);
    expect(result.body.paging.total_page).toBe(2);
  });

  it("should successful if query page is valid", async () => {
    const result = await supertest(app)
      .get("/api/contacts")
      .query({ page: 2 })
      .set("Authorization", "example");

    expect(result.status).toBe(200);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
    expect(result.body.paging.total_page).toBe(2);
  });

  it("should fail if query is invalid", async () => {
    const result = await supertest(app)
      .get("/api/contacts")
      .query({ page: "hello" })
      .set("Authorization", "example");

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined()
  });
});
