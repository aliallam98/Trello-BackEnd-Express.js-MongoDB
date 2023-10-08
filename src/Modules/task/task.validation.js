import Joi from "joi";



export const addTask = {
    body:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        status:Joi.string().required(),
        assignTo:Joi.string().required(),
        deadline:Joi.string().required()
    }).required()
}

export const updateTask = {
    body : Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        status:Joi.string().required(),
        assignTo:Joi.string().required()
    }).required()
}