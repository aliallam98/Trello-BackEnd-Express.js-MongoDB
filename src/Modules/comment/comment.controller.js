import boardModel from "../../../DB/models/Board.model.js";
import listModel from "../../../DB/models/List.model.js"
import cardModel from "../../../DB/models/Card.model.js";
import commentModel from "../../../DB/models/Comment.model.js";
import { ErrorClass } from "../../utils/ErrorClass.js";
import { asyncHandler } from "../../utils/errorHandling.js";

// Get all comments on a card
export const getAllCommentOnCard = asyncHandler(async (req, res,next) => {
  const {boardId,listId,cardId} = req.body

  // Validate that the user is a member of the board
  const board = await boardModel.findById(boardId);
  if(!board) return next(new ErrorClass("Board Is Not Found" , 404))
  if (!board.teams.includes(req.user._id)) {
    return next(new ErrorClass("You are not authorized to view this board.", 403))
  }

  
  const list = await listModel.findById(listId)
  if(!list) return next(new ErrorClass("list Is Not Found" , 404))
  
  const card = await cardModel.findById(cardId)
  if(!card) return next(new ErrorClass("card Is Not Found" , 404))

  // Get all comments on the card
  const comments = await commentModel.find({ cardId });

  // Return the comments
  return res.status(200).json({message:"Done", comments})
})

    // Get a comment by ID
// export const getCommentById = asyncHandler(  async (req, res,next) => {
//   const {boardId,listId,cardId,commentId} = req.body
//   // Validate that the user is a member of the board
//   const board = await boardModel.findById(boardId);
//   if (!board.teams.includes(req.user._id)) {
//     return next(new ErrorClass("You are not authorized to view this board.", 403))
//   }

//   // Get all comments on the card
//   const comment = await commentModel.findById(commentId);

//   // Return the comments
//   return res.status(200).json({message:"Done", comment})
// })

  // Create a new comment on a card
  export const createNewComment = asyncHandler(  async (req, res,next) => {
    const {boardId,listId,cardId}= req.body;
    // Validate that the user is a member of the board
    const board = await boardModel.findById(boardId);
    if(!board) return next(new ErrorClass("Board Is Not Found" , 404))
    if (!board.teams.includes(req.user._id)) {
      return next(new ErrorClass("You are not authorized to view this board.", 403))
    }

      
  const list = await listModel.findById(listId)
  if(!list) return next(new ErrorClass("list Is Not Found" , 404))

    // Check if the card exists
    const card = await cardModel.findById(cardId);
    if (!card) {
      return next(new ErrorClass("This Crd Is Not Found.", 404))
    }
  
    // Create a new comment
    const comment = await commentModel.create({
      text: req.body.text,
      author: req.user._id,
      cardId
    })

    // Return the comment
    return res.status(201).json({message:"Done",comment});
  })
  // commentReplay
  export const commentReplay = asyncHandler(  async (req, res,next) => {
    const {boardId,listId,cardId,commentId}= req.body;
    // Validate that the user is a member of the board
    const board = await boardModel.findById(boardId);
    if(!board) return next(new ErrorClass("Board Is Not Found" , 404))
    if (!board.teams.includes(req.user._id)) {
      return next(new ErrorClass("You are not authorized to view this board.", 403))
    }

      
  const list = await listModel.findById(listId)
  if(!list) return next(new ErrorClass("list Is Not Found" , 404))

    // Check if the card exists
    const comment = await commentModel.findById(commentId);
    if (!comment) {
      return next(new ErrorClass("This comment Is Not Found.", 404))
    }
  
    // Create a new comment
    const commentReplay = await commentModel.create({
      text: req.body.text,
      author: req.user._id,
      cardId
    })
    comment.commentReplaies.push(commentReplay._id)
    await comment.save()

    // Return the comment
    return res.status(201).json({message:"Done",comment});
  })

  // Update a comment
  export const updateComment = asyncHandler(  async (req, res,next) => {
    const {boardId,listId,cardId,commentId,text} = req.body
    // Validate that the user is a member of the board
    const board = await boardModel.findById(boardId);
    if(!board) return next(new ErrorClass("Board Is Not Found" , 404))
    if (!board.teams.includes(req.user._id)) {
      return next(new ErrorClass("You are not authorized to view this board.", 403))
    }


      
  const list = await listModel.findById(listId)
  if(!list) return next(new ErrorClass("list Is Not Found" , 404))
  
  const card = await cardModel.findById(cardId)
  if(!card) return next(new ErrorClass("card Is Not Found" , 404))
  
    // Get the comment by ID
    const comment = await commentModel.findByIdAndUpdate(commentId,{text},{new:true});
  
    // If the comment does not exist, return a 404 error
    if (!comment) return next(new ErrorClass("Comment Not Found.", 404))
    if(!comment.author == req.user._id || !board.createdBy == req.user._id) 
    return next(new ErrorClass("You are not authorized to update this Comment.", 403))
    // Return the comment
    return res.status(200).json({message:"Done",comment});
  })

  // Delete a comment
  export const deleteComment = asyncHandler(  async (req, res,next) => {
    const {boardId,listId,cardId ,commentId} = req.body
    // Validate that the user is a member of the board
    const board = await boardModel.findById(boardId);
    if(!board) return next(new ErrorClass("Board Is Not Found" , 404))
    if (!board.teams.includes(req.user._id)) {
      return next(new ErrorClass("You are not authorized to view this board.", 403))
    }


      
  const list = await listModel.findById(listId)
  if(!list) return next(new ErrorClass("list Is Not Found" , 404))
  
  const card = await cardModel.findById(cardId)
  if(!card) return next(new ErrorClass("card Is Not Found" , 404))
  
    // Get the comment by ID
    const comment = await commentModel.findById(commentId);
  
    // If the comment does not exist, return a 404 error
    if (!comment) return next(new ErrorClass("Comment Not Found.", 404))
    if(!comment.author == req.user._id || !board.createdBy == req.user._id) 
    return next(new ErrorClass("You are not authorized to Delete this Comment.", 403))

    await comment.deleteOne()
    card.comments.pull(comment._id)
    await card.save()

    // Return a success response
    return res.status(200).json({message:"Deleted"});
  })
