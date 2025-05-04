import { body, param } from "express-validator";
import { validateField } from "./validate-field.js";
import { customerExists } from "../helpers/db-validators.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";

export const addCustomersValidator = [
    validateJWT, 
    body("name").notEmpty().withMessage("Name is required"),
    body("users").notEmpty().withMessage("user is required").isMongoId().withMessage("Invalid enterprise ID"),
    validateField
];

export const editCustomersValidator = [
    validateJWT, 
    body("name").optional().notEmpty().withMessage("Name is required"),
    body("enterprise").optional().isMongoId().withMessage("Invalid enterprise ID"),
    validateField
];

export const deleteCustomerValidator = [
    validateJWT, 
    param("cid").isMongoId().withMessage("Invalid customer ID"),
    param("cid").custom(customerExists),
    validateField,
    handleErrors
];