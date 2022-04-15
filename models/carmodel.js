import mongoose from "mongoose";

const Schema = mongoose.Schema;

const carSchema = mongoose.Schema({
    name: String,
    imgUrl: String,
    coordinates: [String],
    country: String,
    state: {
        type: String,
        default: "available",
    },
    cost: Number,
    reservations: [[String]],
    trip_history: [Schema.Types.ObjectId],
});

export default mongoose.model("Car", carSchema);
