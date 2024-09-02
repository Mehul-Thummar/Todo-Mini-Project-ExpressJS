const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

exports.verifyToken = async (req, res, next) => {
    try {
        // let authorization = req.headers['authorization'];
        let authorization = req.cookies["jwt"];
        // console.log(authorization)
        if (!authorization)
            return res.json({ message: 'Not authorization' });
        let token = authorization.split(" ")[1];
        let { userId } = await jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findOne({ _id: userId, isDelete: false })
        // console.log("user: ", user);

        if (!user || user == undefined) {
            return res.json({ message: 'User Authorization Not Fonded' })
        }
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}