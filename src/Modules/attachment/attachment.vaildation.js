import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const addNewAttachment = {
  body: joi.object().required().keys({
    fileName: joi.string(),
    fileType: joi.string(),
    boardId: generalFields.id.required(),
    listId: generalFields.id.required(),
    cardId: generalFields.id.required()
  }),
  params: joi.object().required().keys(),
  query: joi.object().required().keys(),
  files: joi.object().required().keys({
    files:joi.array().items(generalFields.file.required()).required().max(10)
  }),
};

export const getAllAttachmentsOnCard = {
  body: joi.object().required().keys({
    boardId: generalFields.id.required(),
    listId: generalFields.id.required(),
    cardId: generalFields.id.required()
  }),
  params: joi.object().required().keys(),
  query: joi.object().required().keys(),
  file: generalFields.file,
};
export const deleteAttachment = {
  body: joi.object().required().keys({
    boardId: generalFields.id.required(),
    listId: generalFields.id.required(),
    cardId: generalFields.id.required(),
    attachmentId: generalFields.id.required(),
  }),
  params: joi.object().required().keys(),
  query: joi.object().required().keys(),
  file: generalFields.file,
};
