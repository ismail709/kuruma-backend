import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    phone_number: String,
    address: {
        city: String,
        country: String,
    },
    credit_card: {
        fullname: String,
        card_number: Number,
        expiration_date: Date,
        cvv: Number,
    },
    trip_history: [Schema.Types.ObjectId],
    active_trip: Schema.Types.ObjectId,
});

export default mongoose.model("User", userSchema);
