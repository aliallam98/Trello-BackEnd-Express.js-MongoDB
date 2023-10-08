import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const createList = {
  body: joi.object().required().keys({
    title: joi.string().required(),
    position: joi.number().positive().integer(),
  }),
  params: joi.object().required().keys({
    boardId: generalFields.id.required(),
  }),
  query: joi.object().required().keys(),
  file: generalFields.file,
};
export const updateList = {
  body: joi.object().required().keys({
    title: joi.string(),
    position: joi.number().positive().integer(),
    boardId: generalFields.id,
    listId: generalFields.id,
  }),
  params: joi.object().required().keys({
    boardId: generalFields.id.required(),
    listId: generalFields.id.required(),
  }),
  query: joi.object().required().keys(),
  file: generalFields.file,
};
export const getListByID = {
  body: joi.object().required().keys(),
  params: joi.object().required().keys({
    boardId: generalFields.id.required(),
    listId: generalFields.id.required(),
  }),
  query: joi.object().required().keys(),
  file: generalFields.file,
};
export const getAllListOnBorad = {
  body: joi.object().required().keys(),
  params: joi.object().required().keys({
    boardId: generalFields.id.required(),
  }),
  query: joi.object().required().keys(),
  file: generalFields.file,
};
export const deleteList = {
  body: joi.object().required().keys(),
  params: joi.object().required().keys({
    boardId: generalFields.id.required(),
    listId: generalFields.id.required(),
  }),
  query: joi.object().required().keys(),
  file: generalFields.file,
};
