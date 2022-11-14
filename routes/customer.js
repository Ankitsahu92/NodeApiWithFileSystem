const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, param, query } = require("express-validator");
const validateShema = require("../middleware/validate-schema");
const express = require("express");
const controller = require("../controllers/customer");
const router = express.Router();

router.post(
    `/registration`,
    [
        check("name").exists(),
        //check("email", "Please include a valid email").isEmail(),
        check("password", "Password is required").exists(),
        // .bail().isLength({ min: 5 })
        // .withMessage('Password must be at least 5 chars long').bail()
        // .matches(/\d/)
        // .withMessage('Password must contain a number'),
        check("userName").exists(),
        check("userType").exists(),
    ],
    validateShema,
    controller.registration
);

module.exports = router;