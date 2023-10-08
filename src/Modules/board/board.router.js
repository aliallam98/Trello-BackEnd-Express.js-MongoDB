import { Router } from "express";
const router = Router();
import * as boardController from './board.controller.js'
import * as boardValidators from './board.validation.js'
import { validation } from "../../middleware/validation.js";
import { auth } from "../../middleware/auth.js";
import { endpoint } from "./board.endpoint.js";
import listRouter from '../list/list.router.js'


router.use('/:boardId/list',listRouter)


router.route('/').post(auth(endpoint.create),validation(boardValidators.createBoard), boardController.createBoard)
.get( boardController.getAllBorads)
.get(auth(endpoint.create, boardController.getAllBoradsOfUser)) // Only Loggin User 


router.route('/:boardId')
.put(auth(endpoint.create),validation(boardValidators.updateBoard) ,boardController.updateBoard)
.delete(auth(endpoint.create),validation(boardValidators.deleteBoard) ,boardController.deleteBoardByCreator)
.get(auth(endpoint.create),validation(boardValidators.getBoardByID), boardController.getBoardByID)
.post(auth(endpoint.create), boardController.addTeamMembersToBoardByCreator)




export default router;
