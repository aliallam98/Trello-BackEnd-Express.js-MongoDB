import mongoose, { Schema, model, Types } from "mongoose";

const commentSchema = new Schema(
  {
    text: {
      type : String,
      required : true,
  },
    author: {
      type: Types.ObjectId,
      ref: "User",
    },
    cardId: {
      type: Types.ObjectId,
      ref: "Card",
    },
    commentReplaies:[{
      type: Types.ObjectId,
      ref: "Comment",
    }]
  },
  { timestamps: true }
);

const commentModel = mongoose.models.Comment || model("Comment", commentSchema);

export default commentModel;
