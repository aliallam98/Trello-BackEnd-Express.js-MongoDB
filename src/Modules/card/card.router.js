
import { Router } from "express";
const router = Router();
import * as cardController from './card.controller.js'
import { auth } from "../../middleware/auth.js";
import { endpoint } from "./card.endpoint.js";
import { validation } from "../../middleware/validation.js";
import * as cardVaildators from './card.validation.js'

router.get('/',auth(endpoint.get),cardController.getAllCardsOnList)
// router.get('/',auth(endpoint.create),cardController.getCardById)


router.post('/',auth(endpoint.create),validation(cardVaildators.createCard),cardController.createNewCard)
router.put('/',auth(endpoint.update),validation(cardVaildators.updateCard),cardController.updateCard)
router.delete('/',auth(endpoint.delete),validation(cardVaildators.deleteCard),cardController.deleteCardByCreator)


router.get('/deadline',auth(endpoint.get),cardController.getAllCardAfterDeadLine)


export default router;
