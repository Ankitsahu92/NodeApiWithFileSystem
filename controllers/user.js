const User = require("../models/user");
const generic = require("../util/output.service");
const bcrypt = require('bcryptjs');

exports.Add = async (req, res, next) => {
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

exports.Get = (req, res, next) => {
    User.fetchAll((item) => {
        res.status(200).json(generic.jsonRes(200, "", item));
    });
};

exports.GetByID = (req, res, next) => {
    const Id = req.params.id;
    User.findById(Id, item => {
        if (!item) {
            res.status(400).json(generic.jsonRes(404, "record not found!!!"));
        }
        res.status(200).json(generic.jsonRes(200, "", item));
    });
};

exports.deleteById = (req, res, next) => {
    const id = req.params.id;
    User.deleteById(id, resp => res.status(resp.status).json(resp));
};

exports.updateUser = async (req, res, next) => {
    const body = req.body;
    if (body && body.password) {
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.password, salt);
    }
    User.updateUserDetailsById(body, resp => res.status(resp.status).json(resp));
};


exports.auth = async (req, res, next) => {
    const body = req.body;
    User.auth(body, resp => res.status(resp.status).json(resp));
};
