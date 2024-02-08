import Joi from "joi";

const pattern = /^[^<>/()#=|&!?:;]*$/;

const patternPhone = /^(\+62|0)[0-9]{9,15}$/;

const create = Joi.object({
  first_name: Joi.string().trim().max(100).pattern(pattern).required(),
  last_name: Joi.string().trim().max(100).pattern(pattern).optional(),
  email: Joi.string().email().trim().max(100).pattern(pattern).optional(),
  phone: Joi.string().pattern(patternPhone).trim().optional(),
}).options({ allowUnknown: false });

const get = Joi.number().positive().integer().required();

const update = Joi.object({
  id: Joi.number().positive().integer().required(),
  first_name: Joi.string().trim().max(100).pattern(pattern).optional(),
  last_name: Joi.string().trim().max(100).pattern(pattern).optional(),
  email: Joi.string().email().trim().max(100).pattern(pattern).optional(),
  phone: Joi.string().pattern(patternPhone).trim().optional(),
}).options({ allowUnknown: false });

const search = Joi.object({
  page: Joi.number().min(1).positive().integer().default(1),
  size: Joi.number().min(1).max(100).positive().integer().default(10),
  username: Joi.string().trim().max(100).pattern(pattern).required(),
  name: Joi.string().trim().max(200).pattern(pattern).optional(),
  email: Joi.string().email().trim().max(100).pattern(pattern).optional(),
  phone: Joi.string().trim().optional(),
}).options({ allowUnknown: false });

export const contactValidation = {
  create,
  get,
  update,
  search,
};
