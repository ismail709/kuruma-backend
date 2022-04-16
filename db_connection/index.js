import mongoose from "mongoose";

try {
    await mongoose.connect(
        process.env.MDB_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        (err) => {
            if (!err) {
                console.log("success!");
            } else {
                console.error("MNGO", err);
            }
        }
    );
} catch (error) {
    console.log(error);
}