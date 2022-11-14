const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, param, query } = require("express-validator");
const validateShema = require("../middleware/validate-schema");
const express = require("express");
const controller = require("../controllers/accounts");
const router = express.Router();

router.get(`/`, controller.fetchAll);

router.get(`/:id`,
    [
        param('id', "ID is Required").exists()
    ], validateShema, controller.findById);

router.post(
    `/`,
    [
        check("userName").exists(),
        check("password", "Password is required").exists()
        // .bail().isLength({ min: 5 })
        // .withMessage('Password must be at least 5 chars long').bail()
        // .matches(/\d/)
        // .withMessage('Password must contain a number'),
    ],
    validateShema,
    controller.AddUpdate
);

router.put(
    `/`,
    [
        check("id", "ID is required").exists()
    ],
    validateShema,
    controller.AddUpdate
);

router.delete(`/:id`,
    [
        param('id', "ID is Required").exists()
    ], validateShema, controller.deleteById);

module.exports = router;
