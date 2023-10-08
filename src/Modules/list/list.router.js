import { Router } from "express";
const router = Router({mergeParams:true});
import * as listController from './list.controller.js'
import * as listValidators from './list.validation.js'
import { endpoint } from "./list.endpoint.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";



router.route('/')
.get(auth(endpoint.get),validation(listValidators.getAllListOnBorad),listController.getAllListOnBorad)
.post(auth(endpoint.get), validation(listValidators.createList),listController.createList)



router.route('/:listId')
.get(auth(endpoint.get),listController.getListByID)
.put(auth(endpoint.get),validation(listValidators.updateList),listController.updateList)
.delete(auth(endpoint.get),validation(listValidators.deleteList),listController.deleteListByCreator)




export default router;
