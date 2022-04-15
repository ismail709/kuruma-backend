import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { configureAuthentication } from "./auth.js";
import { addCar, getCarById, getCars } from "./controllers/cars_controller.js";
import { createTrip } from "./controllers/trips_controller.js";

const app = express();

const PORT = process.env.PORT || 5000;
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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

configureAuthentication(app);

// send cars data to map
app.get("/cars", getCars);

// send car data to Trip view
app.get("/car/:id", getCarById);

// create Trip
app.get("/api/newtrip", createTrip);

app.post("/addcar", addCar);
app.get("/addcars", (req, res) => {
    res.sendFile(path.resolve("public", "home.html"));
});
app.get("/user/:id", (req, res) => {
    console.log(req.params.id);
    res.json({ name: "hello" });
});

// serving car images to frontend
app.use(express.static("public"));
app.get("/img", express.static("/img"));

app.listen(PORT, () => {
    console.log("server is listening on port " + PORT);
    console.log("click here: http://localhost:" + PORT);
});
