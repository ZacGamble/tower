import { type } from "express/lib/response";
import mongoose from "mongoose";

const Schema = mongoose.Schema

export const TowerEventSchema = new Schema(
    {
        // id: {type: String, required: true},
        creatorId: { type: Schema.Types.ObjectId, required: true},
        name: {type: String, required: true},
        description: { type: String, required: true },
        coverImg: { type: String, required: true},
        location: { type: String, required: true },
        capacity: { type: Number, required: true },
        startDate: { type: Date, required: true },
        isCancelled: { type: Boolean },
        type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true}        

        }
);

TowerEventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})