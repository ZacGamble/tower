import mongoose from "mongoose";

const Schema = mongoose.Schema

export const TicketSchema = new Schema(
    {
        // id: { type: String, required: true },
        eventId: { type: Schema.Types.ObjectId, required: true},
        accountId: { type: Schema.Types.ObjectId, required: true },

    }
);

TicketSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})