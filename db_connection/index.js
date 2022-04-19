import mongoose from "mongoose";

await mongoose.connect(
  process.env.MDB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (!error) {
      console.log("success!");
    } else {
      throw error;
    }
  }
);
