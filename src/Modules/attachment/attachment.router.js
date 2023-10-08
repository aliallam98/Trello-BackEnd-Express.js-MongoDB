import { Router } from "express";
const router = Router();
import * as attachmentController from "./attachments.controller.js";
import * as attachmentVaildators from "./attachment.vaildation.js";
import { validation } from "../../middleware/validation.js";
import { auth } from "../../middleware/auth.js";
import { endpoint } from "./attachment.endpoint.js";
import { fileUpload, fileValidation } from "../../utils/multer.js";

router.get(
  "/",
  auth(endpoint.get),
  validation(attachmentVaildators.getAllAttachmentsOnCard),
  attachmentController.getAllAttachmentsOnCard
);

router.post(
  "/",
  auth(endpoint.create),
  fileUpload(fileValidation.imageVideosPfdWord).fields([{ name: "files", maxCount: 10 }]),
  validation(attachmentVaildators.addNewAttachment),
  attachmentController.addNewAttachment
);


router.delete(
  "/",
  auth(endpoint.delete),
  validation(attachmentVaildators.deleleAttachment),
  attachmentController.deleleAttachment
);

export default router;
