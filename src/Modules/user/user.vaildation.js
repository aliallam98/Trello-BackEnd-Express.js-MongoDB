import Joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const signUp = {
  body: Joi.object().required().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: generalFields.email,
    password: Joi.string().pattern(new RegExp()).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    phone:Joi.string(),
    age:Joi.number().positive().integer(),
    gender:Joi.string()
  }),
  params:Joi.object().required().keys(),
  query:Joi.object().required().keys(),
  file:generalFields.file
};
export const confirm = {
  body: Joi.object().required().keys({
    email: generalFields.email,
    OTP:Joi.string().required()
  }),
  params:Joi.object().required().keys(),
  query:Joi.object().required().keys(),
  file:generalFields.file
};

export const logIn = {
  body: Joi.object().required().keys({
    email:generalFields.email,
    password:Joi.string().required()
  }),
  params:Joi.object().required().keys(),
  query:Joi.object().required().keys(),
  file:generalFields.file
}
export const getUserById = {
  body: Joi.object().required().keys(),
  params:Joi.object().required().keys({
    userId : generalFields.id
  }),
  query:Joi.object().required().keys(),
  file:generalFields.file
}
export const changeUserPassword = {
  body: Joi.object().required().keys({
    oldPassword:Joi.string().required(),
    newPassword:Joi.string().required(),
    confirmNewPassword:Joi.string().valid(Joi.ref('newPassword')).required()
  }),
  params:Joi.object().required().keys(),
  query:Joi.object().required().keys(),
  file:generalFields.file
}
export const sendResetOTPPassword = {
  body: Joi.object().required().keys({
   email:generalFields.email
  }),
  params:Joi.object().required().keys(),
  query:Joi.object().required().keys(),
  file:generalFields.file
}
export const resetPasswordByOTP = {
  body: Joi.object().required().keys({
   email:generalFields.email,
  OTP:Joi.string().required(),
  newPassword:Joi.string().required(),
  confirmPassword:Joi.string().valid(Joi.ref("newPassword")).required()
  }),
  params:Joi.object().required().keys(),
  query:Joi.object().required().keys(),
  file:generalFields.file
}



export const updateUser= {
  body: Joi.object().required().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    lastName: Joi.string(),
    phone: Joi.string(),
    age: Joi.number().positive().integer(),
  }),
  params:Joi.object().required().keys(),
  query:Joi.object().required().keys(),
  file:generalFields.file
}