const User = require("../model/user.model");
const Todo = require("../model/todo.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

exports.signUp = (req, res) => {
    res.render('signup');
}
exports.signupUser = async (req, res) => {
    try {
        // console.log(req.body);
        let user = await User.findOne({ email: req.body.email, isDelete: false });
        if (user) {
            return res.send({ message: 'User Already Existed....' });
        }
        let hashpassword = await bcrypt.hash(req.body.password, 10);
        user = await User.create({ ...req.body, password: hashpassword });
        res.render('login.ejs');
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.login = (req, res) => {
    res.render('login');
}
exports.loginUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, isDelete: false });
        if (!user) {
            return res.json({ message: 'User Not Found....' });
        }
        let comparedPassword = await bcrypt.compare(req.body.password, user.password);
        // console.log(comparedPassword);
        if (!comparedPassword) {
            return res.json({ message: "Email or Password Does Not Matched." })
        }
        let token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
        res.cookie("jwt", `Bearer ${token}`)
        res.redirect('/todo/alltodo');
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.profileUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.render('notfound.ejs');
        }
        res.render('user', { user: req.user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.redirect('/login')
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
    }
};