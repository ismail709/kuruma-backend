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
                        console.log("response ",res)
                        if (res) {
                            bcrypt.compare(password, res.password,function(err, result) {
                                if(err) return done(err);
                                if(result === true){
                                    return done(null, res);
                                }
                                done(null, false, { message: "Email or Password incorrect!" });
                            });
                        }else{
                            done(null, false, { message: "Email or Password incorrect!" });
                        }
                    })
                    .catch((err) => {
                        done(err);
                    });
            }
        )
    );
    passport.serializeUser((user, done) => {
        console.log("serialize user");
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        console.log("DEserialize user");
        done(null, user);
    });
    app.post("/login",(req,res,next) =>{
        /*console.log("test")
        if(req.user) res.send({auth:true});
        else res.status(500).send({auth:false,message:req.session.messages});*/
        passport.authenticate("local",function(err,user,info){
        if(err) return next(err);
        if(!user) return res.json({auth:false,message:info.message});
        res.json({auth:true});
    })(req,res,next);
    });

    app.post("/signup", createUser);

    app.get("/logout", (req, res) => {
        req.logout();
        res.json({auth:false});
    });
};
