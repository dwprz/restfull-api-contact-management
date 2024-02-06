import { ResponseError } from "../errors/response-error.js";

export const validation = (schema, request) => {
  const { error, value } = schema.validate(request, {
    abortEarly: false,
    allUnknown: false,
  });

  if (error) throw new ResponseError(400, error.message);

  return value;
};
