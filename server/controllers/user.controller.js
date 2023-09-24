const User = require("../models/user.model");

const login = function(req, res) {
    let reqBody = req.body;

    console.log(reqBody);
    let user = User.login(reqBody.username, reqBody.password);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(403).json({
            message: "Invalid username or password!"
        });
    }
}

module.exports = {
    login
}