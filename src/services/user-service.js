import { prismaClient } from "../applications/database.js";
import { ResponseError } from "../errors/response-error.js";
import { validation } from "../validations/validation.js";
import { userValidation } from "../validations/user-validation.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

const register = async (request) => {
  //
  const user = validation(userValidation.register, request);

  const countUser = await prismaClient.user.count({
    where: { username: user.username },
  });

  if (countUser >= 1) throw new ResponseError(400, "user already exist");

  user.password = await bcrypt.hash(user.password, 10);

  return await prismaClient.user.create({
    data: user,
    select: { username: true, name: true },
  });
};

const login = async (request) => {
  //
  const req = validation(userValidation.login, request);

  const user = await prismaClient.user.findUnique({
    where: { username: req.username },
    select: { username: true, password: true },
  });

  if (!user) throw new ResponseError(401, "username or password is incorrect");

  const isPasswordValid = await bcrypt.compare(req.password, user.password);

  if (!isPasswordValid) throw new ResponseError(401, "password is invalid");

  user.token = uuidV4();

  return await prismaClient.user.update({
    where: { username: user.username },
    data: user,
    select: { token: true },
  });
};

const get = async (username) => {
  //
  username = validation(userValidation.get, username);

  const user = await prismaClient.user.findUnique({
    where: { username: username },
    select: { username: true, name: true },
  });

  if (!user) throw new ResponseError(404, "username is not found");

  return user;
};

const update = async (request) => {
  //
  const user = validation(userValidation.update, request);

  const countUser = await prismaClient.user.count({
    where: { username: user.username },
  });

  if (countUser !== 1) throw new ResponseError(404, "user is not found");

  const data = {};

  if (user.name) data.name = user.name;

  if (user.password) data.password = await bcrypt.hash(user.password, 10);

  const result = await prismaClient.user.update({
    where: { username: user.username },
    data: data,
  });

  return result;
};

const logout = async (username) => {
  //
  username = validation(userValidation.get, username);

  const user = await prismaClient.user.findUnique({
    where: { username: username },
  });

  if (!user) throw new ResponseError(404, "user is not found");

  return await prismaClient.user.update({
    where: { username: user.username },
    data: { token: null },
    select: { username: true },
  });
};

export default {
  register,
  login,
  get,
  update,
  logout,
};
