import mongoose, { Schema, model ,Types } from "mongoose";

const attachmentSchema = new Schema({
  files:[{
    secure_url:String,
    public_id:String
  }],
  fileName: String,
  fileType: String,
  cardId: {
    type: Types.ObjectId,
    ref: 'Card'
  },
  addedBy: {
    type: Types.ObjectId,
    ref: 'User'
  },
},{timestamps:true})

const attachmentModel = mongoose.models.Attachment || model("Attachment",attachmentSchema)

export default attachmentModel