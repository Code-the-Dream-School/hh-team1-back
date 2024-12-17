const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/bad_request");
const { UnauthenticatedError } = require("../errors/unauthenticated");

const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
      user: { name: `${user.firstName} ${user.lastName}` },
      token,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: "Email already exist" });
    } else {
      console.error("Registration Error:", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Registration failed" });
    }
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // check if email and password are provided
    if (!email || !password) {
      throw new BadRequestError("Please provide email and password");
    }

    // find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthenticatedError("Invalid credentials");
    }

    // compare passwords
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Incorrect password");
    }

    // generate JWT token and response
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      user: { name: `${user.firstName} ${user.lastName}` },
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
