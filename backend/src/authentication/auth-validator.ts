import { body } from "express-validator";

export const singupValidator = [
    body("name")
        .exists()
        .notEmpty()
        .withMessage("Name is required")
        .toLowerCase(),
    body("email").isEmail().withMessage("Email is required").toLowerCase(),
    body("username").exists().notEmpty().withMessage("Username is required"),
    body("password")
        .exists()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];

export const loginValidator = [
    body("email").isEmail().withMessage("email is required").toLowerCase(),
    body("password").exists().withMessage("password is required"),
];
