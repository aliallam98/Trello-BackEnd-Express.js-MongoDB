import boardModel from "../../../DB/models/Board.model.js";
import cardModel from "../../../DB/models/Card.model.js";
import listModel from "../../../DB/models/List.model.js";
import { ErrorClass } from "../../utils/ErrorClass.js";
import { checkBoardAndIsAuthorizedToDelete, checkIsCardExist, checkIsListExist } from "../../utils/Reuseable.js";
import { asyncHandler } from "../../utils/errorHandling.js";


export const getAllCardsOnList= asyncHandler(async (req, res,next) => {
  const {boardId,listId} = req.body

  //check board
  const board = await boardModel.findById(boardId);
  if(!board) return next(new ErrorClass("Board not found.",404 ))
  if(!board.teams.includes(req.user._id)) return next(new ErrorClass("You are not authorized to view this board.",403 ))

    //check board
  const list = await listModel.findById(listId);
  if(!list) return next(new ErrorClass("list not found.",404 ))

    //get cards
  const cards = await cardModel.find({listId})
  
  return res.status(200).json({message:"Done", cards});
});
// export const getCardById= asyncHandler(async (req, res,next) => {
//   const {boardId,listId,cardId} = req.body
//   console.log(req.user._id);

//   //check board
//   const board = await boardModel.findById(boardId);
//   if(!board) return next(new ErrorClass("Board not found.",404 ))
//   if(!board.teams.includes(req.user._id)) return next(new ErrorClass("You are not authorized to view this board.",403 ))

//     //check board
//   const list = await listModel.findById(listId);
//   if(!list) return next(new ErrorClass("list not found.",404 ))

//     //get cards
//   const card = await cardModel.findById(cardId)
//   return res.status(200).json({message:"Done", card});
// });



export  const createNewCard = asyncHandler(async(req,res,next)=>{
  // {boardId,listId,title,description,assignTo,deadline}
   req.body.createdBy = req.user._id

   const board = await boardModel.findById(req.body.boardId)
   if (!board)  return next(new ErrorClass("Board not found." , 404))
   if (!board.teams.includes(req.user._id)) 
    return res.status(403).json({ message: "You are not authorized to create lists on this board." });

    const list = await listModel.findById(req.body.listId)
   if (!list)  return next(new ErrorClass("List not found." , 404))

   const card = await cardModel.create(req.body)
   list.cards.push(card._id)
   await list.save()
  return res.status(201).json({message:"Done" , card})

})

export const updateCard = asyncHandler(async(req,res,next)=>{
  const {boardId,listId,cardId,title,description,assignTo,deadline} = req.body
  const board = await boardModel.findById(boardId)
  if(!board) return next(new ErrorClass("Board Is Not Found" , 404))
  if (!board.teams.includes(req.user._id))  return next(new ErrorClass("You are not authorized to create lists on this board." , 403))

  const list = await listModel.findById(listId)
  if(!list) return next(new ErrorClass("list Is Not Found" , 404))

  const card = await cardModel.findById(cardId)
  if(!card) return next(new ErrorClass("list Is Not Found" , 404))



  if(req.body.title) card.title = title 
  if(req.body.description) card.description = description
  if(req.body.assignTo) card.assignTo = assignTo
  if(req.body.deadline) card.deadline = deadline
  await card.save()

  return res.status(200).json({message:"Done" , card })

})

  export const deleteCardByCreator = asyncHandler(async(req,res,next)=>{
    const { boardId,listId,cardId} = req.body

    const board = await boardModel.findById(boardId)
    if(!board) return next(new ErrorClass("Board Not Found", 404))
    if(board.createdBy.toString() !== req.user._id.toString()) 
    return next(new ErrorClass("You are not authorized to delete this card ... only board owner can do that" , 403))


    const list = await listModel.findById(listId)
    if(!list) return next(new ErrorClass("list Not Found", 404))


    const card = await cardModel.findById(cardId)
    if(!card) return next(new ErrorClass("card Not Found", 404))

    await card.deleteOne()
    list.cards.pull(card._id)
    await list.save()
    return res.status(200).json({message:"Deleted"})

})


export const getAllCardAfterDeadLine = asyncHandler(async (req,res,next)=>{
  const cardsAfterDeadLine = await cardModel.find({
    deadline : {$lte: new Date()},
    status: { $in: ["ToDo", "Doing"] }
  }) 

  res.status(200).json({message:"Done",cardsAfterDeadLine})
})




























    
// const result = await cardModel.aggregate([
//   {
//     $match: {
//       _id: cardId,
//       listId: listId,
//     },
//   },
//   {
//     $lookup: {
//       from: "boardModel",
//       localField: "listId",
//       foreignField: "_id",
//       as: "board",
//     },
//   },
//   {
//     $unwind: "$board",
//   },
//   {
//     $match: {
//       "board._id": boardId,
//     },
//   },
// ]);


//   console.log(result);
// if (result.length === 0) {
//   // The board, list, or card does not exist
//   let errorMessage = "";
//   if (!result.some((item) => item.board)) {
//     errorMessage += "Board not found. ";
//   }
//   if (!result.some((item) => item.list)) {
//     errorMessage += "List not found. ";
//   }
//   if (!result.some((item) => item._id)) {
//     errorMessage += "Card not found. ";
//   }

//   return next(new ErrorClass(errorMessage, 404));
// }

// return res.status(200).json({ message: "Done", card: result[0] });