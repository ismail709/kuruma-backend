import MongoStore from "connect-mongo";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import {
    createUser,
    getUser,
    getUserById,
} from "../controllers/users_controller.js";
export const configureAuthentication = (app) => {
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({ mongoUrl: process.env.MDB_URL }),
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(
        new LocalStrategy(
            { usernameField: "email" },
            (email, password, done) => {

                getUser(email, password)
                    .then((res) => {
                        if (res) {
                            done(null, { id: res._id, username: res.username });
                        } else {
                            done(null, false, { message: "User not found" });
                        }
                    })
                    .catch((err) => {
                        done(err);
                    });
            }
        )
    );
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    app.post("/login", passport.authenticate("local"));

    app.post("/signup", createUser);

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });
};
