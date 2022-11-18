const General = require("../models/general");

exports.fetchAll = async (req, res, next) => {
    const fileName = req.params.fileName;
    const general = new General(fileName);
    General.fetchAll((responseObj) => {
        res.status(responseObj.status).json(responseObj);
    });
};

exports.findById = async (req, res, next) => {
    const fileName = req.params.fileName;
    const Id = req.params.id;
    const general = new General(fileName);
    General.findById("id", Id, (responseObj) => {
        res.status(responseObj.status).json(responseObj);
    });
};

exports.findById = async (req, res, next) => {
    const fileName = req.params.fileName;
    const Id = req.params.id;
    const general = new General(fileName);
    General.findById("id", Id, (responseObj) => {
        res.status(responseObj.status).json(responseObj);
    });
};


exports.findByIdAndValue = async (req, res, next) => {
    const fileName = req.params.fileName;
    const Id = req.params.id;
    const value = req.params.value;
    const general = new General(fileName);
    General.findById(Id, value, (responseObj) => {
        res.status(responseObj.status).json(responseObj);
    });
};


exports.AddUpdate = async (req, res, next) => {
    const fileName = req.params.fileName;
    const body = req.body;
    const general = new General(fileName);
    General.AddUpdate(body, (responseObj) => {
        res.status(responseObj.status).json(responseObj);
    });
};

exports.deleteById = async (req, res, next) => {
    const fileName = req.params.fileName;
    const Id = req.params.id;
    const general = new General(fileName);
    General.deleteById("id", Id, (responseObj) => {
        res.status(responseObj.status).json(responseObj);
    });
};