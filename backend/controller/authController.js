const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const createToken = require("../utils/createToken");
const ApiError = require("../utils/apiError");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//@des    Signup
//@route  POST /auth/register
//@access Public
const Register = asyncHandler(async (req, res) => {
  const saltRound = 10;

  //make user Object
  const newuser = {
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, saltRound),
    role: req.body.role,
  };
  //find user
  const userExiste = await User.findOne({ email: req.body.email });

  if (userExiste) {
    return res.status(404).send({ message: "user email already existe" });
  }
  const user = await User.create(newuser);
  // Genrate token
  const payload = {
    user_id: user._id,
  };
  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  res.status(200).send({ message: "User register success", data: user, token });
});

//@des  Signin
//@route POST /auth/login
//@access Public
const Login = asyncHandler(async (req, res) => {
  //find by email
  const saltRound = 10;
  //find user if exist in table users
  const userExiste = await User.findOne({ email: req.body.email });
  if (!userExiste) {
    return res.status(404).json({ message: "user not found" });
  }

  //compare password if correct
  const match = await bcrypt.compare(req.body.password, userExiste.password);
  //check if email aready exist or password
  if (!match || !userExiste) {
    return res.status(404).send({ message: "email or password not correct " });
  }

  //create object user
  const user = {
    id: userExiste._id,
    name: userExiste.name,
    email: userExiste.email,
    role: userExiste.role,
  };
  const token = createToken(userExiste._id);

  //retrun user data with token genrer

  res.status(200).send({
    message: "login succesfuly",
    user,
    token: token,
  });
});

async function Profil(req, res) {
  try {
    const user = await User.findOne({ _id: req.user_id });
    res.status(200).send({ message: "Hotels Find with success", user });
  } catch (error) {
    console.log(error);
  }
}
// @desc   make sure the user is logged in
const protect = asyncHandler(async (req, res, next) => {
  console.log("JWT Secret Key:", process.env.JWT_SECRET_KEY);

  // 1) Check if token exist, if exist get
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new ApiError(
        "You are not login, Please login to get access this route",
        401
      )
    );
  }
  // 2) Verify token (no change happens, expired token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(token);

  // 3) Check if user exists
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError(
        "The user that belong to this token does no longer exist",
        401
      )
    );
  }

  // 4) Check if user change his password after token created
  if (currentUser.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    // Password changed after token created (Error)
    if (passChangedTimestamp > decoded.iat) {
      return next(
        new ApiError(
          "User recently changed his password. please login again..",
          401
        )
      );
    }
  }

  req.user = currentUser;
  next();
});
// @desc    Authorization (User Permissions)
// ["admin", "manager"]
const allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    console.log(req.user);
    // 1) access roles
    // 2) access registered user (req.user.role)
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You are not allowed to access this route", 403)
      );
    }
    next();
  });
//@desc Forgot password
//route POST /api/v1/auth/forgotPassword
//access Public
const forgotPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user with that email ${req.body.email}`, 404)
    );
  }
  // 2) If user exist, Generate hash reset random 6 digits and save it in db
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");

  // Save hashed password reset code into db
  user.passwordResetCode = hashedResetCode;
  // Add expiration time for password reset code (10 min)
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;

  await user.save();

  // 3) Send the reset code via email
  const message = `Hi ${user.name},\n We received a request to reset the password on your Booking Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The Booking Team`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset code (valid for 10 min)",
      message,
    });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;
    console.log(err);

    await user.save();
    return next(new ApiError("There is an error in sending email", 500));
  }

  res
    .status(200)
    .json({ status: "Success", message: "Reset code sent to email" });
});
// @desc    Verify password reset code
// @route   POST /api/v1/auth/verifyResetCode
// @access  Public
const verifyPassResetCode = asyncHandler(async (req, res, next) => {
  // 1) Get user based on reset code
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(req.body.resetCode)
    .digest("hex");

  const user = await User.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ApiError("Reset code invalid or expired"));
  }

  // 2) Reset code valid
  user.passwordResetVerified = true;
  await user.save();

  res.status(200).json({
    status: "Success",
  });
});
// @desc    Reset password
// @route   POST /api/v1/auth/resetPassword
// @access  Public
const resetPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user based on email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user with email ${req.body.email}`, 404)
    );
  }

  // 2) Check if reset code verified
  if (!user.passwordResetVerified) {
    return next(new ApiError("Reset code not verified", 400));
  }

  user.password = req.body.newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;

  await user.save();

  // 3) if everything is ok, generate token
  const token = createToken(user._id);
  res.status(200).json({ token });
});

module.exports = {
  Register,
  Login,
  Profil,
  protect,
  allowedTo,
  forgotPassword,
  verifyPassResetCode,
  resetPassword,
};
