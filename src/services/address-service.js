import { prismaClient } from "../applications/database.js";
import { ResponseError } from "../errors/response-error.js";
import { addressValidation } from "../validations/address-validation.js";
import { contactValidation } from "../validations/contact-validation.js";
import { userValidation } from "../validations/user-validation.js";
import { validation } from "../validations/validation.js";

const checkExistingContact = async (username, contactId) => {
  //
  username = validation(userValidation.get, username);

  contactId = validation(contactValidation.get, contactId);

  const contactCount = await prismaClient.contact.count({
    where: {
      username: username,
      id: contactId,
    },
  });

  if (contactCount !== 1) throw new ResponseError(404, "contact is not found");

  return contactId;
};

const create = async (username, contactId, address) => {
  //
  contactId = await checkExistingContact(username, contactId);

  address.contact_id = contactId;

  address = validation(addressValidation.create, address);

  const addressCount = await prismaClient.address.count({
    where: {
      contact_id: address.contact_id,
      street: address.street,
      city: address.city,
      district: address.district,
      country: address.country,
      postal_code: address.postal_code,
    },
  });

  if (addressCount === 1) throw new ResponseError(400, "address already exist");

  return await prismaClient.address.create({
    data: address,
    select: {
      id: true,
      street: true,
      city: true,
      district: true,
      country: true,
      postal_code: true,
    },
  });
};

const getListAddress = async (username, contactId) => {
  //
  contactId = await checkExistingContact(username, contactId);

  const addresses = await prismaClient.address.findMany({
    where: {
      contact_id: contactId,
    },
  });

  if (addresses.length === 0)
    throw new ResponseError(404, "addresses is empty");

  return addresses;
};

const update = async (username, contactId, address) => {
  //
  contactId = await checkExistingContact(username, contactId);

  address.id = validation(addressValidation.get, address.id);

  address.contact_id = contactId;

  address = validation(addressValidation.update, address);

  const validProperties = [
    "id",
    "street",
    "city",
    "district",
    "country",
    "postal_code",
  ];

  address = Object.entries(address).filter(([key]) => {
    return validProperties.includes(key);
  });

  address = Object.fromEntries(address);

  return await prismaClient.address.update({
    where: {
      id: address.id,
      contact_id: contactId,
    },
    data: address,
    select: {
      id: true,
      street: true,
      city: true,
      district: true,
      country: true,
      postal_code: true,
    },
  });
};

const get = async (username, contactId, addressId) => {
  //
  contactId = await checkExistingContact(username, contactId);

  addressId = validation(addressValidation.get, addressId);

  const address = await prismaClient.address.findUnique({
    where: {
      id: addressId,
      contact_id: contactId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      district: true,
      country: true,
      postal_code: true,
    },
  });

  if (!address) throw new ResponseError(404, "address is not found");

  return address;
};

const remove = async (username, contactId, addressId) => {
  //
  contactId = await checkExistingContact(username, contactId);

  addressId = validation(addressValidation.get, addressId);

  const addressCount = await prismaClient.address.count({
    where: {
      id: addressId,
      contact_id: contactId,
    },
  });

  if (addressCount !== 1) throw new ResponseError(404, "address is not found");

  await prismaClient.address.delete({
    where: {
      id: addressId,
      contact_id: contactId,
    },
  });
};

export const addressService = {
  create,
  getListAddress,
  update,
  get,
  remove,
};
