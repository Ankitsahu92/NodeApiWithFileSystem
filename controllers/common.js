const customer = require("../models/customer");
const Common = require("../models/common");
const generic = require("../util/output.service");
const bcrypt = require('bcryptjs');

exports.getBeneficiary = async (req, res, next) => {
    const Id = req.params.id;
    const classObj = new Common("account");
    console.log("getBeneficiary");
    Common.getBeneficiary(Id, (resObj) => {
        res.status(resObj.status).json(resObj);
    })
};

exports.tranferMoney = async (req, res, next) => {
    const body = req.body;
    body.amount = +body.amount
    const classObj = new Common("account");
    console.log("TranferMoney");
    Common.tranferMoney(body, (resObj) => {
        res.status(resObj.status).json(resObj);
    })
    // res.status(200).json(body);
};
