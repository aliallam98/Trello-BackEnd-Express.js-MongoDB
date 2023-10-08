import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const createCard = {
  body: joi.object().required().keys({
    boardId:generalFields.id.required(),
    listId:generalFields.id.required(),
    title: joi.string().required(),
    description: joi.string(),
    assignTo:generalFields.id.required(),
    deadline:joi.date().min(Date.now()).required(),
  }),
  params: joi.object().required().keys(),
  query: joi.object().required().keys(),
  file: generalFields.file,
};
export const updateCard = {
    body: joi.object().required().keys({
        boardId:generalFields.id.required(),
        listId:generalFields.id.required(),
        cardId:generalFields.id.required(),
        title: joi.string(),
        description: joi.string(),
        assignTo:generalFields.id,
        deadline:joi.date().min(Date.now()),
      }),
      params: joi.object().required().keys(),
      query: joi.object().required().keys(),
      file: generalFields.file,
};
export const getAllListOnBorad = {
  body: joi.object().required().keys({
    boardId: generalFields.id.required(),
    listId: generalFields.id.required(),
  }),
  params: joi.object().required().keys(),
  query: joi.object().required().keys(),
  file: generalFields.file,
};
export const deleteCard = {
  body: joi.object().required().keys({
    boardId: generalFields.id.required(),
    listId: generalFields.id.required(),
    cardId: generalFields.id.required(),
  }),
  params: joi.object().required().keys(),
  query: joi.object().required().keys(),
  file: generalFields.file,
};
