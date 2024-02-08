import { prismaClient } from "../applications/database.js";
import { ResponseError } from "../errors/response-error.js";
import { contactValidation } from "../validations/contact-validation.js";
import { validation } from "../validations/validation.js";

const create = async (username, contact) => {
  //
  contact = validation(contactValidation.create, contact);

  contact.username = username;

  return await prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
};

const get = async (username, contactId) => {
  //
  contactId = validation(contactValidation.get, contactId);

  const result = await prismaClient.contact.findUnique({
    where: {
      id: contactId,
      username: username,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });

  if (!result) throw new ResponseError(404, "contact is not found");

  return result;
};

const update = async (username, contact) => {
  //
  contact = validation(contactValidation.update, contact);

  const contactCount = await prismaClient.contact.count({
    where: { username: username, id: contact.id },
  });

  if (contactCount != 1) throw new ResponseError(404, "contact is not found");

  const validProperties = ["first_name", "last_name", "email", "phone"];

  let data = Object.entries(contact).filter(([key]) => {
    return validProperties.includes(key);
  });

  data = Object.fromEntries(data);

  if (Object.keys(data).length === 0) {
    throw new ResponseError(400, "empty data");
  }

  return await prismaClient.contact.update({
    where: { id: contact.id },
    data: data,
  });
};

const remove = async (username, contactId) => {
  contactId = validation(contactValidation.get, contactId);

  const contactCount = await prismaClient.contact.count({
    where: { id: contactId, username: username },
  });

  if (contactCount !== 1) throw new ResponseError(404, "contact is not found");

  await prismaClient.contact.delete({
    where: { id: contactId, username: username },
  });
};

const search = async (request) => {
  //
  request = validation(contactValidation.search, request);

  const skip = (request.page - 1) * request.size;

  const filters = [
    { username: request.username },
    ...(request.name
      ? [
          {
            OR: [
              { first_name: { contains: request.name } },
              { last_name: { contains: request.name } },
            ],
          },
        ]
      : []),
    ...(request.email ? [{ email: { contains: request.email } }] : []),
    ...(request.phone ? [{ phone: { contains: request.phone } }] : []),
  ];

  const contacts = await prismaClient.contact.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  if (contacts.length == 0)
    throw new ResponseError(404, "Contact is not found");

  const totalItem = await prismaClient.contact.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: contacts,
    paging: {
      page: request.page,
      total_page: Math.ceil(totalItem / 10),
      total_item: totalItem,
    },
  };
};

export const contactService = {
  create,
  get,
  update,
  remove,
  search,
};
