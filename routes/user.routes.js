const express = require("express");
const userRoutes = express.Router();
const {
    signUp, signupUser, loginUser, profileUser,
    login, logout
} = require("../controller/user.controller");
const { verifyToken } = require('../helpers/verifyToken');


userRoutes.get("/signup", signUp);
userRoutes.post("/signup", signupUser);
userRoutes.get("/login", login);
userRoutes.post("/login", loginUser);
userRoutes.get("/profile", verifyToken, profileUser);
userRoutes.get("/logout", verifyToken, logout);


module.exports = userRoutes;