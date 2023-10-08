import mongoose, { Schema, model ,Types } from "mongoose";

const listSchema = new Schema({
    title: {
        type : String,
        required : true,
    },
    position: Number,
  boardId: {
    type:Types.ObjectId,
    ref: 'Board'
  },
  cards: [{
    type:Types.ObjectId,
    ref: 'Card'
  }]
},{timestamps:true})

const listModel = mongoose.models.List || model("List",listSchema)

export default listModel

