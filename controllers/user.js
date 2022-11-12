const User = require("../models/user");
const generic = require("../util/output.service");
const bcrypt = require('bcryptjs');

exports.Add = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const isActive = true;
    const item = new User(null, name, email, password, salt, isActive);
    item.save((resp) => {
        res.json(resp);
    });
};

exports.Get = (req, res, next) => {
    User.fetchAll((item) => {
        res.json(generic.jsonRes(200, "", item));
    });
};

exports.GetByID = (req, res, next) => {
    const Id = req.params.id;
    User.findById(Id, item => {
        if (!item) {
            res.json(generic.jsonRes(404, "record not found!!!"));
        }
        res.json(generic.jsonRes(200, "", item));
    });
};


exports.deleteById = (req, res, next) => {
    const id = req.params.id;
    User.deleteById(id, resp => res.json(resp));
};



exports.updateUser = async (req, res, next) => {
    const body = req.body;
    if (body && body.password) {
        const salt = await bcrypt.genSalt(10);
        body.salt = salt;
        body.password = await bcrypt.hash(body.password, salt);
    }
    console.log(body, "body");
    User.updateUserDetailsById(body, resp => res.json(resp));
};
