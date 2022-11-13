const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, param, query } = require("express-validator");
const validateShema = require("../middleware/validate-schema");
const express = require("express");
const controller = require("../controllers/user");
const router = express.Router();

router.get(`/`, controller.Get);

router.get(`/:id`,
    [
        param('id', "id is Required").exists()
    ], validateShema, controller.GetByID);

router.post(
    `/`,
    [
        check("userName").exists(),
        //check("email", "Please include a valid email").isEmail(),
        check("password", "Password is required").exists().bail().isLength({ min: 5 })
            .withMessage('Password must be at least 5 chars long').bail()
            .matches(/\d/)
            .withMessage('Password must contain a number'),
    ],
    validateShema,
    controller.Add
);

router.delete(`/:id`,
    [
        param('id', "id is Required").exists()
    ], validateShema, controller.deleteById);

router.put(
    `/`,
    [
        check("id", "id is required").exists()
    ],
    validateShema,
    controller.updateUser
);



module.exports = router;
