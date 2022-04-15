import mongoose from "mongoose";
import STATE from "./constants";

const Schema = mongoose.Schema;

const tripSchema = mongoose.Schema({
    user_id: Schema.Types.ObjectId,
    car_id: Schema.Types.ObjectId,
    cost: Number,
    time: {
        start: Date,
        end: Date,
    },
    state: {
        type: Schema.Types.Mixed,
        default: STATE.ACTIVE,
    },
});

export default mongoose.model("Trip", tripSchema);
