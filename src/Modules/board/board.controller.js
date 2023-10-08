import boardModel from "../../../DB/models/Board.model.js";
import { ErrorClass } from "../../utils/ErrorClass.js";
import { asyncHandler } from "../../utils/errorHandling.js";

// Get all boards
export const getAllBorads = asyncHandler(async (req, res,next) => {
  const boards = await boardModel.find();
  return res.status(200).json({message:"Done",boards});
});


// Get all boards of loggin user
export const getAllBoradsOfUser = asyncHandler(async (req, res,next) => {
  const boards = await boardModel.find({createdBy:req.user._id});
  return res.status(200).json({message:"Done",boards});
});

// Get a board by ID
export const getBoardByID = asyncHandler(async (req, res,next) => {
  const {boardId} = req.params
  const board = await boardModel.findById(boardId);
  if (!board)  return next(new ErrorClass("Board not found." , 404))

   return res.status(200).json({message:"Done", board});

});

export const createBoard = asyncHandler(async (req,res,next) => {
  const { title, description , teams } = req.body;
  const createdBy = req.user._id
  
  if (req.body.teams){
      for (const member of teams) {
        const user = await userModel.findById(member)
        if(!user)
        return next(new ErrorClass(`This User : ${member} Is Not Exist`))
      }
  }

  // Add the creator to the board's members list
  const board = await boardModel.create({ title, description ,teams , createdBy })
  board.teams.push(req.user._id);
  await board.save();

  return res.status(201).json({message:"Done",board});

})

// Update a board
export const updateBoard = asyncHandler(async (req, res,next) => {
  const {boardId} = req.params
  const board = await boardModel.findById(boardId);
  if (!board) return next(new ErrorClass('This Board Is Not Exist ', 404))
  if (board.createdBy.toString() !== req.user._id.toString())
  return next(new ErrorClass("You are not authorized to update this board." , 403))


  const { title, description } = req.body;
  if(req.body.title) board.title = title;
  if(req.body.description) board.description = description;
  await board.save();

  return res.status(200).json({message:"Done" , board })
})

export const deleteBoardByCreator = asyncHandler(async(req,res,next)=>{
  const {boardId}= req.params
  
  const board = await boardModel.findById(boardId)
  if(!board) return next(new ErrorClass("Board Not Found", 404))
  if(board.createdBy.toString() !== req.user._id.toString()) 
  return next(new ErrorClass("You are not authorized to delete this board." , 403))

  await board.deleteOne();

  return res.status(200).json({message:"Deleted"})
})
export const addTeamMembersToBoardByCreator = asyncHandler(async(req,res,next)=>{
  const {boardId}= req.params
  
  const board = await boardModel.findById(boardId)
  if(!board) return next(new ErrorClass("Board Not Found", 404))
  if(board.createdBy.toString() !== req.user._id.toString()) 
  return next(new ErrorClass("You are not authorized to Do  this Action on this board." , 403))

  board.teams.addToSet('651b433c35b56795d1241285')
  await   board.save();


  return res.status(200).json({message:"Added"})
})






