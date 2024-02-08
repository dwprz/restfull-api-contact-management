import { logger } from "../applications/logging.js";
import { addressService } from "../services/address-service.js";

const create = async (req, res, next) => {
  try {
    //
    const {
      user: { username },
      params: { contactId },
      body: address,
    } = req;

    const result = await addressService.create(username, contactId, address);
    res.status(200).json({ data: result });
    //
  } catch (error) {
    next(error);
  }
};

const getListAddress = async (req, res, next) => {
  try {
    //
    const {
      user: { username },
      params: { contactId },
    } = req;

    const result = await addressService.getListAddress(username, contactId);
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
      params: { contactId, addressId },
      body: address,
    } = req;

    address.id = Number(addressId);

    const result = await addressService.update(
      username,
      Number(contactId),
      address
    );
    res.status(200).json({ data: result });
    //
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  //
  try {
    //
    const {
      user: { username },
      params: { contactId, addressId },
    } = req;

    const result = await addressService.get(
      username,
      Number(contactId),
      Number(addressId)
    );
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
      params: { contactId, addressId },
    } = req;

    await addressService.remove(username, Number(contactId), Number(addressId));
    res.status(200).json({ data: "OK" });
    //
  } catch (error) {
    next(error);
  }
};

export const addressController = {
  create,
  getListAddress,
  update,
  get,
  remove,
};
