import mongoose, { Schema, model ,Types } from "mongoose";


// (Task)
const cardSchema = new Schema({
    title: {
        type : String,
        required : true,
    },
    description:{
        type:String,
    },
    status:{
        type:String,
        default:"ToDo",
        enum:['ToDo', 'Doing', 'Done']
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User'
      },
      assignTo:{
        type:String,
        required:true
    },
    deadline:{
        type:Date,
        require:true,
        min:Date.now()
    },
      listId: {
        type: Types.ObjectId,
        ref: 'List'
      },
      comments: [{
        type: Types.ObjectId,
        ref: 'Comment'
      }],
      attachments: [{
        type: Types.ObjectId,
        ref: 'Attachment'
      }]
},{timestamps:true})

const cardModel = mongoose.models.Card || model("Card",cardSchema)

export default cardModel