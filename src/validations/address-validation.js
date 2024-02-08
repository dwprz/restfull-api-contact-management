import Joi from "joi";

const pattern = /^[^<>/()#=|&!?:;]*$/;

const create = Joi.object({
  contact_id: Joi.number().positive().integer().required(),
  street: Joi.string().trim().max(150).pattern(pattern).optional(),
  city: Joi.string().trim().max(100).pattern(pattern).optional(),
  district: Joi.string().trim().max(100).pattern(pattern).optional(),
  country: Joi.string().trim().max(100).pattern(pattern).required(),
  postal_code: Joi.string().trim().max(10).pattern(pattern).required(),
}).options({ allowUnknown: false });

const update = Joi.object({
  id: Joi.number().min(1).positive().integer().required(),
  contact_id: Joi.number().positive().integer().required(),
  street: Joi.string().trim().max(150).pattern(pattern).optional(),
  city: Joi.string().trim().max(100).pattern(pattern).optional(),
  district: Joi.string().trim().max(100).pattern(pattern).optional(),
  country: Joi.string().trim().max(100).pattern(pattern).required(),
  postal_code: Joi.string().trim().max(10).pattern(pattern).required(),
});

const get = Joi.number().min(1).positive().integer().required();

export const addressValidation = {
  create,
  update,
  get,
};
