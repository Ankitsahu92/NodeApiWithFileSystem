const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, param, query } = require("express-validator");
const validateShema = require("../middleware/validate-schema");
const express = require("express");
const controller = require("../controllers/api");
const router = express.Router();

router.get(
    `/:fileName/`,
    [param("fileName", "fileName is Required").exists()],
    validateShema,
    controller.fetchAll
);

router.get(
    `/:fileName/:id`,
    [
        param("fileName", "fileName is Required").exists(),
        param("id", "ID is Required").exists(),
    ],
    validateShema,
    controller.findById
);

router.post(
    `/:fileName/`,
    [
        param("fileName", "fileName is Required").exists(),
        check("userName").exists(),
        check("password", "Password is required").exists(),
        // .bail().isLength({ min: 5 })
        // .withMessage('Password must be at least 5 chars long').bail()
        // .matches(/\d/)
        // .withMessage('Password must contain a number'),
    ],
    validateShema,
    controller.AddUpdate
);

router.put(
    `/:fileName/`,
    [
        param("fileName", "fileName is Required").exists(),
        check("id", "ID is required").exists(),
    ],
    validateShema,
    controller.AddUpdate
);

router.delete(
    `/:fileName/:id`,
    [
        param("fileName", "fileName is Required").exists(),
        param("id", "ID is Required").exists(),
    ],
    validateShema,
    controller.deleteById
);

module.exports = router;
