const User = require("../models/user.model");
let status = 200;
let message = {};

const login = function(req, res) {
    const reqBody = req.body;
    const user = User.login(reqBody.username, reqBody.password);
    if (user) {
        status = 200;;
        message = user;
    } else {
        status = 403;
        message = {
            message: "Invalid username or password!"
        }
    }
    res.status(status).json(message);
}

module.exports = {
    login
}