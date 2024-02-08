import supertest from "supertest";
import { utilContactTest } from "../contact/util";
import { utilUserTest } from "../user/util";
import { utilAddressTest } from "./util";
import app from "../../src/applications/app";
import { logger } from "../../src/applications/logging";

// npx jest tests/address/address.test.js

describe("POST /api/contacts/:contactId/addresses", function () {
  //
  beforeEach(async () => {
    await utilUserTest.create();
    await utilContactTest.create();
  });

  afterEach(async () => {
    await utilAddressTest.remove();
    await utilContactTest.remove();
    await utilUserTest.remove();
  });

  it("should successful create address", async () => {
    const { id: contactId } = await utilContactTest.get();
    const result = await supertest(app)
      .post(`/api/contacts/${contactId}/addresses`)
      .set("Authorization", "example")
      .send({
        street: "Goatan Street",
        city: "Northen City",
        district: "Northen District",
        country: "Pantura Kingdom",
        postal_code: "1227",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("Goatan Street");
    expect(result.body.data.city).toBe("Northen City");
    expect(result.body.data.district).toBe("Northen District");
    expect(result.body.data.country).toBe("Pantura Kingdom");
    expect(result.body.data.postal_code).toBe("1227");
  });

  it("should fail if postal_code does not exist", async () => {
    const { id } = await utilContactTest.get();
    const result = await supertest(app)
      .post(`/api/contacts/${id}/addresses`)
      .set("Authorization", "example")
      .send({
        street: "Goatan Street",
        city: "Northen City",
        district: "Northen District",
        country: "Pantura Kingdom",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId/addresses", function () {
  //
  beforeEach(async () => {
    await utilUserTest.create();
    await utilContactTest.create();
    await utilAddressTest.createMany();
  });

  afterEach(async () => {
    await utilAddressTest.remove();
    await utilContactTest.remove();
    await utilUserTest.remove();
  });

  it("should successful get list address", async () => {
    const { id } = await utilContactTest.get();
    const result = await supertest(app)
      .get(`/api/contacts/${id}/addresses`)
      .set("Authorization", "example");

    expect(result.status).toBe(200);
    const contactId = result.body.data.map((item) => item.contact_id);
    expect(contactId).toContain(id);
  });

  it("should fail if contactId is invalid", async () => {
    const result = await supertest(app)
      .get("/api/contacts/123invalid/addresses")
      .set("Authorization", "example");

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PUT /api/contacts/:contactId/addresses/:addressId", function () {
  //
  beforeEach(async () => {
    await utilUserTest.create();
    await utilContactTest.create();
    await utilAddressTest.createMany();
  });

  afterEach(async () => {
    await utilAddressTest.remove();
    await utilContactTest.remove();
    await utilUserTest.remove();
  });

  it("should success update address", async () => {
    const { id: contactId } = await utilContactTest.get();
    const [{ id: firstId }] = await utilAddressTest.get();
    const result = await supertest(app)
      .put(`/api/contacts/${contactId}/addresses/${firstId}`)
      .set("Authorization", "example")
      .send({
        street: "Flower Street",
        city: "Flower City",
        district: "FLower District",
        country: "Pantura Kingdom",
        postal_code: "12345",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(firstId);
    expect(result.body.data).toEqual({
      id: firstId,
      street: "Flower Street",
      city: "Flower City",
      district: "FLower District",
      country: "Pantura Kingdom",
      postal_code: "12345",
    });
  });

  it("should fail if country does not exist", async () => {
    const { id: contactId } = await utilContactTest.get();
    const [{ id: firstId }] = await utilAddressTest.get();
    const result = await supertest(app)
      .put(`/api/contacts/${contactId}/addresses/${firstId}`)
      .set("Authorization", "example")
      .send({
        street: "Flower Street",
        city: "Flower City",
        district: "FLower District",
        postal_code: "12345",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId/addresses/:addressId", function () {
  //
  beforeEach(async () => {
    await utilUserTest.create();
    await utilContactTest.create();
    await utilAddressTest.createMany();
  });

  afterEach(async () => {
    await utilAddressTest.remove();
    await utilContactTest.remove();
    await utilUserTest.remove();
  });

  it("should successful get address", async () => {
    const { id: contactId } = await utilContactTest.get();
    const [{ id: firstId }] = await utilAddressTest.get();
    const result = await supertest(app)
      .get(`/api/contacts/${contactId}/addresses/${firstId}`)
      .set("Authorization", "example");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(firstId);
  });

  it("should fail if address id is invalid", async () => {
    const { id: contactId } = await utilContactTest.get();
    const [{ id: firstId }] = await utilAddressTest.get();
    const result = await supertest(app)
      .get(`/api/contacts/${contactId}/addresses/123invalid`)
      .set("Authorization", "example");

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/contacts/:contactId/addresses/:addressId", function () {
  //
  beforeEach(async () => {
    await utilUserTest.create();
    await utilContactTest.create();
    await utilAddressTest.createMany();
  });

  afterEach(async () => {
    await utilAddressTest.remove();
    await utilContactTest.remove();
    await utilUserTest.remove();
  });

  it("should successful delete address", async () => {
    const { id: contactId } = await utilContactTest.get();
    const [{ id: firstId }] = await utilAddressTest.get();
    const result = await supertest(app)
      .delete(`/api/contacts/${contactId}/addresses/${firstId}`)
      .set("Authorization", "example");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");
  });

  it("should fail if id is invalid", async () => {
    const { id: contactId } = await utilContactTest.get();
    const result = await supertest(app)
      .delete(`/api/contacts/${contactId}/addresses/123invalid`)
      .set("Authorization", "example");

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
