import mongoose from "mongoose";


const Schema = mongoose.Schema

export const CommentSchema = new Schema(
    {
        // id: { type: String, required: true},
        creatorId: {type: Schema.Types.ObjectId, required: true},
        eventId: {type: Schema.Types.ObjectId, required: true },
        body: { type: String, required: true},
        isAttending: { type: Boolean }
    }
)

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})