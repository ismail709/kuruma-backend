import User from "../models/usermodel.js";
import bcrypt from "bcrypt";

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
  const { email, password, ...rest } = req.body;
  const existedUser = await User.find({ email });
  if (existedUser.length > 0) {
    res.status(400).json({
      message: "An account with this email already exists! Please sign in",
    });
  } else {
    bcrypt.hash(password, 10, function (err, hash) {
      // Store hash in your password DB.
      if (err) res.status(500).json(e);
      User.create({ email, password: hash, ...rest })
        .then((resp) => {
          req.login(resp, (err) => {
            if (err) {
              res
                .status(500)
                .send({ message: "we encountered an internal error!" });
            }
            return res.json({
              message: "Account created!",
              user: resp,
            });
          });
        })
        .catch((e) => {
          res.status(500).json({
            message: e,
          });
        });
    });
  }
};
