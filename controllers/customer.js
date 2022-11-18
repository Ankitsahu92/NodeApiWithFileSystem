const customer = require("../models/customer");
const User = require("../models/user");
const generic = require("../util/output.service");
const bcrypt = require('bcryptjs');


exports.registration = async (req, res, next) => {
    const name = req.body.name;
    const userName = req.body.userName;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const isActive = true;
    const userType = req.body.userType;
    const item = new User(null, name, userName, password, isActive, userType);
    item.save((resp) => {
        res.status(resp.status).json(resp);
    });
};

exports.authenticate = async (req, res, next) => {
    const body = req.body;
    User.auth(body, resp => res.status(resp.status).json(resp));
};