require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const server = express();
const dbURL = process.env.MONGO_URL;
const mongoose = require("mongoose");
const cookie = require('cookie-parser');

const userRoutes = require("./routes/user.routes");
const todoRoutes = require("./routes/todo.routes");
const cors = require('cors');
const ejs = require('ejs');

server.use(cors());
server.use(cookie());
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));


server.set("view engine", 'ejs');

server.get("/", (req, res) => {
    res.render("index");
});


server.use("/", userRoutes);
server.use("/todo", todoRoutes);

server.listen(8001, () => {

    // Database Connection
    mongoose
        .connect(dbURL)
        .then(() => console.log("Database Connection Established Success...."))
        .catch((err) => console.log(err));
    console.log(`Server start at http://localhost:8001`);
});