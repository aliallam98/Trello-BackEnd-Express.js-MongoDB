import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const createComment = {
  body: joi.object().required().keys({
    text: joi.string().required(),
    boardId: generalFields.id.required(),
    listId: generalFields.id.required(),
    cardId: generalFields.id.required()
  }),
  params: joi.object().required().keys(),
  query: joi.object().required().keys(),
  file: generalFields.file,
};
export const updateComment = {
  body: joi.object().required().keys({
    text: joi.string().required(),
    boardId: generalFields.id.required(),
    listId: generalFields.id.required(),
    cardId: generalFields.id.required(),
    commentId: generalFields.id.required()
  }),
  params: joi.object().required().keys(),
  query: joi.object().required().keys(),
  file: generalFields.file,
};
export const commentReplay = {
  body: joi.object().required().keys({
    text: joi.string().required(),
    boardId: generalFields.id.required(),
    listId: generalFields.id.required(),
    cardId: generalFields.id.required(),
    commentId: generalFields.id.required()
  }),
  params: joi.object().required().keys(),
  query: joi.object().required().keys(),
  file: generalFields.file,
};

export const getAllCommentOnCard = {
  body: joi.object().required().keys({
    boardId: generalFields.id.required(),
    listId: generalFields.id.required(),
    cardId: generalFields.id.required()
  }),
  params: joi.object().required().keys(),
  query: joi.object().required().keys(),
  file: generalFields.file,
};
export const deleteComment = {
  body: joi.object().required().keys({
    boardId: generalFields.id.required(),
    listId: generalFields.id.required(),
    cardId: generalFields.id.required(),
    commentId: generalFields.id.required(),
  }),
  params: joi.object().required().keys(),
  query: joi.object().required().keys(),
  file: generalFields.file,
};
