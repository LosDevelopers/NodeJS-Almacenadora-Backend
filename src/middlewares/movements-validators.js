import { body, param } from 'express-validator';
import { productExists } from "../helpers/db-validators.js";
import { validateField } from "./validate-field.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from './validate-roles.js';


export const registerMovementValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    body('product').notEmpty().withMessage('Product ID is required').isMongoId().withMessage('Invalid product ID').custom(productExists),
    body('type').notEmpty().withMessage('Movement type is required').isIn(['entry', 'exit']).withMessage('Type must be either "entry" or "exit"'),
    body('quantity').notEmpty().withMessage('Quantity is required').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    body('note').optional().isString().withMessage('Note must be a string'),
    validateField,
    handleErrors
];

export const getMovementsValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    validateField,
    handleErrors
];


export const getMovementValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    param('mid').isMongoId().withMessage('Invalid movement ID'),
    validateField,
    handleErrors
];

export const getMovementsByProductValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    param('pid').isMongoId().withMessage('Invalid product ID'),
    validateField,
    handleErrors
];