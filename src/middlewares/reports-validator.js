import { body, param } from "express-validator";
import { validateField } from "./validate-field.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const validatorGenerateReport = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validateField,
    handleErrors
]

export const validatorGenerateMovements = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("directory").notEmpty().withMessage("Directory is required"),
    body("startDate").notEmpty().withMessage("Start date is required"),
    body("endDate").notEmpty().withMessage("End date is required"),
    validateField,
    handleErrors
]


