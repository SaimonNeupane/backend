import { configDotenv } from "dotenv";
import User from "../models/email.js";
export const EmailValidator = async (req, res, next) => {
  try {
    const { email, role } = req.body;

    const save = await User.create({ email, role });

    return res.status(200).json({
      status: "success",
      message: "The email is verified",
    });
  } catch (err) {
    console.log(err);

    if (err.code === 11000) {
      return res.status(409).json({
        status: "fail",
        message: "This email is already registered for this role.",
      });
    }

    return res.status(400).json({
      status: "fail",
      message: err.message || "Something went wrong",
    });
  }
};

//duplicate email ko code 11000
