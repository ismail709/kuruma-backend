import express from "express";
import cors from "cors";
import { configureAuthentication } from "./auth/index.js";
import "./db_connection/index.js"

const app = express();

const PORT = process.env.PORT || 5000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

configureAuthentication(app);

// routes


// serving car images to frontend
app.use(express.static("public"));
app.get("/img", express.static("/img"));

app.listen(PORT, () => {
    console.log("server is listening on port " + PORT);
    console.log("click here: http://localhost:" + PORT);
});
