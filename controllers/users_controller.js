import User from "../models/usermodel.js";

export const getUser = (email, password) => {
    // check if the user exists
    return User.findOne({ email }).lean();
    // redirect to the app
};
export const getUserById = (id) => {
    return User.findById(id);
};

export const createUser = async (req, res) => {
    // check if the user already exist
    console.log("test ", req.isAuthenticated());
    const data = req.body;
    const existedUser = await User.find({ email: data.email });
    if (existedUser.length > 0) {
        res.status(400).json({
            message:
                "An account with this email already exists! Please Login if you have an account",
        });
    } else {
        User.create(data)
            .then((resp) => {
                req.login(resp, (err) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    console.log("test ", req.isAuthenticated());
                    return res.json({
                        message: "Account created!",
                        user: resp,
                    });
                });
            })
            .catch((e) => {
                console.log(e);
                res.status(500).json({
                    message: e,
                });
            });
    }

    //res.json("test");
    // register the user
    // redirect it to login page2
};
