import attachmentModel from "../../../DB/models/Attachment.model.js";
import boardModel from "../../../DB/models/Board.model.js";
import listModel from "../../../DB/models/List.model.js";
import cardModel from "../../../DB/models/Card.model.js";
import cloudinary from "../../utils/cloudinary.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import { ErrorClass } from "../../utils/ErrorClass.js";

// Get all attachments on a card
export const getAllAttachmentsOnCard = asyncHandler(async (req, res, next) => {
  const { boardId, cardId } = req.body;
  const board = await boardModel.findById(boardId);
  if (!board) return next(new ErrorClass("Board Is Not Found", 404));
  if (!board.teams.includes(req.user._id))
    return next(
      new ErrorClass("You are not authorized to view this board.", 403)
    );

  const attachments = await attachmentModel.find({ cardId });

  return res.status(201).json({ message: "Done", attachments });
});

// Create a new attachment on a card
export const addNewAttachment = asyncHandler(async (req, res, next) => {
  const { boardId, listId, cardId, fileName, fileType } = req.body;
  // Validate that the user is a member of the board

  const board = await boardModel.findById(boardId);
  if (!board) return next(new ErrorClass("Board Is Not Found", 404));
  if (!board.teams.includes(req.user._id))
  return next(new ErrorClass("You are not authorized to view this board.", 403))


  const list = await listModel.findById(listId);
  if (!list) return next(new ErrorClass("list Is Not Found", 404));

  // // Check if the card exists
  const card = await cardModel.findById(cardId);
  if (!card) return next(new ErrorClass("card Is Not Found", 404));

  const files = [];
  for (let i = 0; i < req.files.files.length; i++) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.files.files[i].path,
      { folder: `Trello-Attachments/Card-${card.title}` }
    );
    files.push({ secure_url, public_id });
  }

  // Create a new attachment
  const attachment = await attachmentModel.create({
    files,
    fileName,
    fileType,
    cardId,
    addedBy: req.user._id,
  });
  card.attachments.push(attachment._id);
  await card.save();

  // Return the attachment
  return res.status(201).json({ message: "Done", attachment });
});

// Get an attachment by ID

// export const getAttachmentById = asyncHandler(async(req,res,next)=>{
//   const {boardId,AttachmentId}= req.body
//   const board = await boardModel.findById(boardId);
//   if (!board.teams.includes(req.user._id))
//     return next(new ErrorClass("You are not authorized to view this board.", 403))

//   const attachment = await attachmentModel.findById(AttachmentId)
//   if(!attachment) return next(new ErrorClass("Cannot Found this attachment", 404))

//   return res.status(201).json({message:"Done",attachment});

// })

// Delete an attachment
export const deleleAttachment = asyncHandler(async (req, res,next) => {
  const { boardId, listId, cardId, attachmentId} = req.body;
  // Validate that the user is a member of the board

  const board = await boardModel.findById(boardId);
  if (!board) return next(new ErrorClass("Board Is Not Found", 404));
  if (!board.teams.includes(req.user._id))
  return next(new ErrorClass("You are not authorized to view this board.", 403))


  const list = await listModel.findById(listId);
  if (!list) return next(new ErrorClass("list Is Not Found", 404));

  // // Check if the card exists
  const card = await cardModel.findById(cardId);
  if (!card) return next(new ErrorClass("card Is Not Found", 404));

  const attachment = await attachmentModel.findById(attachmentId)
  if (!attachment) return next(new ErrorClass("attachment Not Found", 404));

  attachment.deleteOne()
  for (let i = 0; i < attachment.files.length; i++) {
    await cloudinary.uploader.destroy(attachment.files[i].public_id)
  } 
  card.attachments.pull(attachment._id);
  await card.save();

  // Return the attachment
  return res.status(201).json({ message: "Deleted Done" });
});
