import Joi from "joi";

const pattern = /^[^<>/()#=|&!?:;]*$/;

const register = Joi.object({
  username: Joi.string().trim().max(100).pattern(pattern).required(),
  password: Joi.string().trim().max(100).pattern(pattern).required(),
  name: Joi.string().trim().max(100).pattern(pattern).required(),
});

const login = Joi.object({
  username: Joi.string().trim().max(100).pattern(pattern).required(),
  password: Joi.string().trim().max(100).pattern(pattern).required(),
});

const get = Joi.string().trim().max(100).pattern(pattern).required();

const update = Joi.object({
  username: Joi.string().trim().max(100).pattern(pattern).required(),
  password: Joi.string().trim().max(100).pattern(pattern).optional(),
  name: Joi.string().trim().max(100).pattern(pattern).optional(),
});

export const userValidation = {
  register,
  login,
  get,
  update,
};

// const phoneNumberSchemaID = Joi.string().pattern(/^(\+62|0)[0-9]{9,15}$/).trim().required();
