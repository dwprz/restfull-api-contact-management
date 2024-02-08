import { prismaClient } from "../../src/applications/database";
import { utilContactTest } from "../contact/util";
import { utilUserTest } from "../user/util";

const remove = async () => {
  await prismaClient.address.deleteMany({
    where: {
      contact: {
        username: "kongleong poseidon",
      },
    },
  });
};

const createMany = async () => {
  const { id } = await utilContactTest.get();
  for (let i = 1; i <= 5; i++) {
    await prismaClient.address.create({
      data: {
        street: `Goatan Street${i}`,
        city: `Northen City${i}`,
        district: `Northen District${i}`,
        country: `Pantura Kingdom${i}`,
        postal_code: `1227${i}`,
        contact_id: id,
      },
    });
  }
};

const get = async () => {
  return await prismaClient.address.findMany({
    where: {
      contact: {
        username: "kongleong poseidon",
      },
    },
    select: { id: true },
  });
};

export const utilAddressTest = {
  remove,
  createMany,
  get,
};
