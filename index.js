import express from "express";
import cors from "cors";
import { configureAuthentication } from "./auth/index.js";
import "./db_connection/index.js"
import CarRouter from "./routes/cars_route.js"

const app = express();

const PORT = process.env.PORT || 5000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: "https://3000-ismail709-kuruma-t2b90ig0j3d.ws-eu34.gitpod.io",
    credentials: true,
    preflightContinue:true,
  }));

configureAuthentication(app);

// routes
app.use("/cars",CarRouter);

// serving car images to frontend
app.use(express.static("public"));
app.get("/img", express.static("/img"));

app.listen(PORT, () => {
    console.log("server is listening on port " + PORT);
    console.log("click here: http://localhost:" + PORT);
});


/*
TO CHECK ORIGIN URL
(req,res,next) => {
  console.log(req.headers);
  next();
},
*/