import { Router } from "express";
const router = Router();
import * as commentController from './comment.controller.js'
import * as commentVaildators from './comment.validation.js'
import { validation } from "../../middleware/validation.js";
import { auth } from "../../middleware/auth.js";
import { endpoint } from "./comment.endpoint.js";



router.get('/',auth(endpoint.get),validation(commentVaildators.getAllCommentOnCard),commentController.getAllCommentOnCard)

router.post('/',auth(endpoint.create),validation(commentVaildators.createComment),commentController.createNewComment)
router.post('/replay',auth(endpoint.create),validation(commentVaildators.commentReplay),commentController.commentReplay)
router.patch('/',auth(endpoint.update),validation(commentVaildators.updateComment),commentController.updateComment)
router.delete('/',auth(endpoint.delete),validation(commentVaildators.deleteComment),commentController.deleteComment)


export default router;
