import asyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";

const protect = asyncHandler(async (req, res, next) => {
  // Skip token verification for development/testing purposes
  const userId = req.query.userId;  // Assuming you include userId in the query parameter for testing

  if (userId) {
    req.user = await User.findById(userId).select("-password");
    next();
  } else {
    res.status(401).json({ message: "Not authorized, userId missing" });
  }
});

export { protect };
