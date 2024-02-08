import Joi from "joi";

const pattern = /^[^<>/()#=|&!?:;]*$/;

const register = Joi.object({
  username: Joi.string().trim().max(100).pattern(pattern).required(),
  password: Joi.string().trim().max(100).pattern(pattern).required(),
  name: Joi.string().trim().max(100).pattern(pattern).required(),
}).options({ allowUnknown: false });

const login = Joi.object({
  username: Joi.string().trim().max(100).pattern(pattern).required(),
  password: Joi.string().trim().max(100).pattern(pattern).required(),
}).options({ allowUnknown: false });

const get = Joi.string().trim().max(100).pattern(pattern).required();

const update = Joi.object({
  username: Joi.string().trim().max(100).pattern(pattern).required(),
  password: Joi.string().trim().max(100).pattern(pattern).optional(),
  name: Joi.string().trim().max(100).pattern(pattern).optional(),
}).options({ allowUnknown: false });

export const userValidation = {
  register,
  login,
  get,
  update,
};
