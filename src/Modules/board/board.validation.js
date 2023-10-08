import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'


export const createBoard = {
  body : joi.object().required().keys({
    title: joi.string().required(),
    description: joi.string().required(),
    teams: joi.array().items(generalFields.id).optional(),
  }),
  params:joi.object().required().keys(),
  query:joi.object().required().keys(),
  file:generalFields.file
}
export const updateBoard = {
  body : joi.object().required().keys({
    title: joi.string(),
    description: joi.string(),
  }),
  params:joi.object().required().keys({
    id:generalFields.id
  }),
  query:joi.object().required().keys(),
  file:generalFields.file
}
export const getBoardByID = {
  body : joi.object().required().keys(),
  params:joi.object().required().keys({
    id:generalFields.id
  }),
  query:joi.object().required().keys(),
  file:generalFields.file
}
export const deleteBoard = {
  body : joi.object().required().keys(),
  params:joi.object().required().keys({
    id:generalFields.id
  }),
  query:joi.object().required().keys(),
  file:generalFields.file
}



