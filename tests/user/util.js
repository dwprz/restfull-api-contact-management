import { prismaClient } from "../../src/applications/database.js";
import bcrypt from "bcrypt";

const remove = async () => {
  await prismaClient.user.deleteMany({
    where: { username: "kongleong poseidon" },
  });
};

const create = async () => {
  return await prismaClient.user.create({
    data: {
      username: "kongleong poseidon",
      password: await bcrypt.hash("12345678", 10),
      name: "kongleong",
      token: "example",
    },
  });
};

const get = async () => {
  return await prismaClient.user.findUnique({
    where: { username: "kongleong poseidon" },
  });
};

export const utilUserTest = {
  remove,
  create,
  get
};
