const { validationResult } = require('express-validator');
const generic = require("../util/output.service");
module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(
            generic.jsonRes(400, "", null, errors.array())
        );
    }
    next();
};
