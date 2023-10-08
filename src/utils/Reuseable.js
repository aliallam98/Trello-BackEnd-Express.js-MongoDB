import { ErrorClass } from "./ErrorClass.js";
import cloudinary from "./cloudinary.js";
import { asyncHandler } from "./errorHandling.js";
import otpGenerator from 'otp-generator'
import schedule from 'node-schedule'
import { sendEmail } from "./email.js";
import userModel from "../../DB/models/User.model.js";
import boardModel from "../../DB/models/Board.model.js";
import listModel from "../../DB/models/List.model.js";
import cardModel from "../../DB/models/Card.model.js";
import moment from "moment";



export const deleteOneById = (model) => {
  return asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const isExist = await model.findByIdAndDelete(id);
    if (!isExist) {
      return next(new ErrorClass("This Document Is Not Exist", 404));
    }
    if (isExist.image.public_id) {
      await cloudinary.uploader.destroy(isExist.image.public_id);
    }

    return res.status(200).json({ message: "Deleted Successfully" });
  });
};

export const getOneById = (model) => {
  return asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const searchResult = await model.findById(id);
    if (!searchResult) {
      return next(new ErrorClass("This Document is Not Exist", 404));
    }
    return res.status(200).json({ message: "Done", searchResult });
  });
};

export const checkUserBasices = (user, next) => {
  //Check IsEmailConfirmed
  if (!user.confirmEmail)
    return next(new ErrorClass("Confirm Your Email First", 401));
  //Check isDeleted
  if (user.isDeleted)
    return next(
      new ErrorClass("Your Account Has Deleted Contact With Support ...", 403)
    );
  //Check Status
  if (user.status == "Blocked")
    return next(
      new ErrorClass("Your Account Has Blocked Contact With Support ...", 403)
    );
};

export const URL = (req) => {
  const URL = `${req.protocol}://${req.headers.host}`;
  return URL;
};

export const dateHandler = (startDateRange, endtDateRange) => {
  const formattedDate = {
    startDate: startDateRange.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }),
    endtDate: endtDateRange.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }),
  };
  return formattedDate;
};


export const NotConfirmedEmailsReminder = async ()=>{
  const notConfirmedUsers = await userModel.find({confirmEmail:false})
  schedule.scheduleJob('0 0 21 * * *',  function(){
      for (let i = 0; i < notConfirmedUsers.length; i++) {
        console.log("Reminder Sent");
        sendEmail({to:notConfirmedUsers[i].email,subject:"NoReplay (Email Confirmation reminder)", text:"This Mail Sent Automatically As Remider To Confirm Your Email Please Do Not Replay"})
      }
    });
}


export const generatorOTP = (n)=>{
  const OTP = {
    OTPCode : otpGenerator.generate(n, { upperCaseAlphabets: false, specialChars: false }),
};
  return OTP
}

export const generatorLimitTimeOTP = (n)=>{
  const OTP = {
    OTPCode : otpGenerator.generate(n, { upperCaseAlphabets: false, specialChars: false }),
    expiredDate : moment().add(2, "minutes").format()
};
  return OTP
}







export const checkBoardAndIsAuthorizedToDelete = async (boardId,req,next)=>{
  const board = await boardModel.findById(boardId)
  if(!board) return next(new ErrorClass("Board Not Found", 404))
  if(board.createdBy.toString() !== req.user._id.toString()) 
  return next(new ErrorClass("You are not authorized to delete this card ... only board owner can do that" , 403))
  return board
}

export const checkIsListExist= async (listId,next)=>{
  const list = await listModel.findById(listId)
  if(!list) return next(new ErrorClass("list Not Found", 404))
  return list
}
export const checkIsCardExist= async (cardId,next)=>{
  const card = await cardModel.findById(cardId)
  if(!card) return next(new ErrorClass("card Not Found", 404))
  return card
}