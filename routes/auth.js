const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, param, query } = require("express-validator");
const validateShema = require("../middleware/validate-schema");
const express = require("express");
const controller = require("../controllers/user");
const router = express.Router();

router.post(
    `/`,
    [
        check("userName").exists(),
        //check("email", "Please include a valid email").isEmail(),
        check("password", "Password is required").exists()
    ],
    validateShema,
    controller.auth
);

module.exports = router;