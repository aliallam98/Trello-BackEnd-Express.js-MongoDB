import boardModel from "../../../DB/models/Board.model.js";
import listModel from "../../../DB/models/List.model.js";
import { ErrorClass } from "../../utils/ErrorClass.js";
import { asyncHandler } from "../../utils/errorHandling.js";

// get all lists on a board
export const getAllListOnBorad = asyncHandler(async (req, res,next) => {
  const {boardId} = req.params
  //check board existing
  const board = await boardModel.findById(boardId);
  if(!board) return next(new ErrorClass("Board not found.",404 ))


  // check that the user is a member of the board
  if(!board.teams.includes(req.user._id)) return next(new ErrorClass("You are not authorized to view this board.",403 ))


     // Get all lists on the board
  const lists = await listModel.find({boardId})
  return res.status(200).json({message:"Done",lists});
});

// Get a board by ID
export const getListByID = asyncHandler(async (req, res,next) => {
  const {boardId, listId} = req.params

  //check board existing
  const board = await boardModel.findById(boardId);
  if (!board)  return next(new ErrorClass("Board not found." , 404))

  // check that the user is a member of the board
  if(!board.teams.includes(req.user._id)) return next(new ErrorClass("You are not authorized to view this board.",403 ))

   const list = await listModel.findById(listId)
   if (!list)  return next(new ErrorClass("list not found." , 404))

   return res.status(200).json({message:"Done", list})
});


export const createList = asyncHandler(async(req,res,next)=>{
  const {boardId} = req.params
  const {title,position} = req.body
  console.log(req.params);

  const board = await boardModel.findById(boardId)
  if(!board) return next(new ErrorClass("Board Is Not Found" , 404))
  if (!board.teams.includes(req.user._id))  return next(new ErrorClass("You are not authorized to create lists on this board." , 403))

  const list = await listModel.create({title,position,boardId})
  board.lists.push(list._id)
  await board.save()

  return res.status(201).json({message:'Done',list})

})

export const updateList = asyncHandler(async(req,res,next)=>{
  const {boardId,listId} = req.params
  const {title,position} = req.body
  const board = await boardModel.findById(boardId)
  if(!board) return next(new ErrorClass("Board Is Not Found" , 404))
  if (!board.teams.includes(req.user._id))  return next(new ErrorClass("You are not authorized to create lists on this board." , 403))

  const list = await listModel.findById(listId)
  if(!list) return next(new ErrorClass("list Is Not Found" , 404))

  list.title = title
  list.position = position
  list.save()

  return res.status(200).json({message:"Done" , list })

})
  

export const deleteListByCreator = asyncHandler(async(req,res,next)=>{
  const {boardId,listId}= req.params
  const board = await boardModel.findById(boardId)
  if(!board) return next(new ErrorClass("Board Not Found", 404))
  if(board.createdBy.toString() !== req.user._id.toString()) 
  return next(new ErrorClass("You are not authorized to delete this list ... only board owner can do that" , 403))

  const list = await listModel.findById(listId)
  if(!list) return next(new ErrorClass("list Not Found", 404))
  await list.deleteOne();
  board.lists.pull(list._id)
  await board.save()
  return res.status(200).json({message:"Deleted"})
})