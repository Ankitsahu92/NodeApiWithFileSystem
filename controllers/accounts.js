const General = require("../models/general");
const fileName = "accounts";

exports.fetchAll = async (req, res, next) => {
    const general = new General(fileName);
    General.fetchAll((responseObj) => {
        res.json(responseObj);
    });
};

exports.findById = async (req, res, next) => {
    const Id = req.params.id;
    const general = new General(fileName);
    General.findById("id", Id, (responseObj) => {
        res.json(responseObj);
    });
};

exports.AddUpdate = async (req, res, next) => {
    const body = req.body;
    const general = new General(fileName);
    General.AddUpdate(body, (responseObj) => {
        res.json(responseObj);
    });
};

exports.deleteById = async (req, res, next) => {
    const Id = req.params.id;
    const general = new General(fileName);
    General.deleteById("id", Id, (responseObj) => {
        res.json(responseObj);
    });
};