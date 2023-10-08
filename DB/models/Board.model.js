import mongoose, { Schema, model ,Types } from "mongoose";

const boardSchema = new Schema({
    title: {
        type : String,
        required : true,
    },
    description:{
        type:String,
        required:true
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User'
      },
      lists: [{
        type: Types.ObjectId,
        ref: 'List'
      }],
      teams: [{
        type: Types.ObjectId,
        ref: 'User'
      }]
},{timestamps:true})


const boardModel = mongoose.models.Board || model("Board",boardSchema)

export default boardModel