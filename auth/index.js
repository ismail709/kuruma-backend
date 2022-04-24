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
                        console.log("response ", res);
                        if (res) {
                            bcrypt.compare(
                                password,
                                res.password,
                                function (err, result) {
                                    if (err) return done(err);
                                    if (result === true) {
                                        return done(null, res);
                                    }
                                    done(null, false, {
                                        message: "Email or Password incorrect!",
                                    });
                                }
                            );
                        } else {
                            done(null, false, {
                                message: "Email or Password incorrect!",
                            });
                        }
                    })
                    .catch((err) => {
                        done(err);
                    });
            }
        )
    );
    passport.serializeUser((user, done) => {
        console.log("ser");
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        console.log("deser");
        done(null, user);
    });
    app.get("/api/user", (req, res) => {
        console.log("get user", req.isAuthenticated());
        console.log("get user", req.user);
        if (req.isAuthenticated()) {
            res.json({ auth: true, user: req.user });
        } else {
            res.json({ auth: false });
        }
    });
    app.post("/api/login", (req, res, next) => {
        passport.authenticate("local", function (err, user, info) {
            if (err) return next(err);
            if (!user) return res.json({ auth: false, message: info.message });
            req.login(user, (err) => {
                if (err) {
                    res.status(500).send({
                        message: "we encountered an internal error!",
                    });
                }
                return res.json({ auth: true, user: user });
            });
        })(req, res, next);
    });

    app.post("/api/signup", createUser);

    app.post("/api/logout", (req, res) => {
        req.logout();
        console.log("logout");
        res.json({ auth: false });
    });
};
