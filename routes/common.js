const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, param, query } = require("express-validator");
const validateShema = require("../middleware/validate-schema");
const express = require("express");
const controller = require("../controllers/common");
const router = express.Router();

router.post(
    `/tranferMoney`,
    [
        check("tranferFromID", "tranferFromID is Required").exists(),
        check("tranferToID", "tranferToID is Required").exists(),
        check("amount", "amount is Required").exists().bail()
            .isNumeric().withMessage('Invalid Amount'),
        //check("email", "Please include a valid email").isEmail(),
        //check("password", "Password is required").exists(),
        // .bail().isLength({ min: 5 })
        // .withMessage('Password must be at least 5 chars long').bail()
        // .matches(/\d/)
        // .withMessage('Password must contain a number'),
        //check("userName").exists(),
        //check("userType").exists(),
    ],
    validateShema,
    controller.tranferMoney
);

router.get(
    `/getBeneficiary/:id`,
    [
        param("id", "ID is Required").exists(),
        //check("name").exists(),
        //check("email", "Please include a valid email").isEmail(),
        //check("password", "Password is required").exists(),
        // .bail().isLength({ min: 5 })
        // .withMessage('Password must be at least 5 chars long').bail()
        // .matches(/\d/)
        // .withMessage('Password must contain a number'),
        //check("userName").exists(),
        //check("userType").exists(),
    ],
    validateShema,
    controller.getBeneficiary
);

module.exports = router;