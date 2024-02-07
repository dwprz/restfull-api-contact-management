import { contactService } from "../services/contact-service";

const create = async (req, res, next) => {
  try {
    //
    const username = req.user.username;

    const result = await contactService.create(username, req.body);
    res.status(200).json({ data: result });
    //
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    //
    const { user, params } = req;

    const contactId = Number(params.contactId);

    const result = await contactService.get(user, contactId);
    res.status(200).json({ data: result });
    //
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    //
    const {
      user: { username },
      params: { contactId },
      body,
    } = req;

    body.id = contactId;

    const result = await contactService.update(username, body);
    res.status(200).json({ data: result });
    //
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    //
    const {
      user: { username },
      params: { contactId },
      body,
    } = req;

    await contactService.remove(username, contactId);
    res.status(200).json({ data: "OK" });
    //
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  try {
    //
    const {
      user: { username },
      query,
    } = req;

    query.username = username;

    const result = await contactService.search(query);
    res.status(200).json(result);
    //
  } catch (error) {
    next(error);
  }
};

export const contactController = {
  create,
  get,
  update,
  remove,
  search,
};
