import { body, param } from "express-validator";
import { validateField } from "./validate-field.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { emailExistsSupplier, supplierExists } from "../helpers/db-validators.js"; 


export const validatorAddSupplier = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("It is not a valid email"),
    body("email").custom(emailExistsSupplier), //falta
    body("phone").optional().isNumeric().withMessage("Phone must be a number"),
    body("address").optional().isString().withMessage("Address must be a string"),
    validateField,
    handleErrors
]

export const validatorGetSupplier = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
]

export const validatorUpdateSupplier = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").optional().isMongoId().custom(supplierExists).withMessage("Not a valid ID"),
    body("name").optional().notEmpty().withMessage("Name is required"),
    body("email").optional().isEmail().withMessage("It is not a valid email"),
    body("phone").optional().isNumeric().withMessage("Phone must be a number"),
    body("address").optional().isString().withMessage("Address must be a string"),
    validateField,
    handleErrors
]

export const validatorDeleteSupplier = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().custom(supplierExists).withMessage("Not a valid ID"),
    validateField,
    handleErrors
]