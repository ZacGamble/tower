import mongoose from "mongoose";
import { TowerEventSchema } from "./TowerEvent";

const Schema = mongoose.Schema

export const TicketSchema = new Schema(
    {
        // id: { type: String, required: true },
        eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true},
        accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },

    },
    
    { timestamps: true, toJSON: { virtuals: true } }
);

TicketSchema.virtual('account', {
    localField: 'accountId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

