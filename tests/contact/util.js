import { prismaClient } from "../../src/applications/database";

const create = async () => {
  await prismaClient.contact.create({
    data: {
      first_name: "kongleong",
      last_name: "poseidon",
      email: "kongleong@gmail.com",
      phone: "0812345678",
      username: "kongleong poseidon",
    },
  });
};

const remove = async () => {
  await prismaClient.contact.deleteMany({
    where: { username: "kongleong poseidon" },
  });
};

const get = async () => {
  return await prismaClient.contact.findFirst({
    where: { username: "kongleong poseidon" },
  });
};

const createMany = async () => {
  for (let i = 1; i <= 15; i++) {
    await prismaClient.contact.create({
      data: {
        username: "kongleong poseidon",
        first_name: `kongleong${i}`,
        last_name: `poseidon${i}`,
        email: `kongleong${i}@gmail.com`,
        phone: `+62812345678${i}`,
      },
    });
  }
};

export const utilContactTest = {
  create,
  remove,
  get,
  createMany,
};
