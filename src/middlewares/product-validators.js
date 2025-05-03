import { body, param, query } from 'express-validator';
import { productExists } from "../helpers/db-validators.js";
import { validateField } from "./validate-field.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { handleErrors } from "./handle-errors.js";

export const createProductValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    body('name').notEmpty().withMessage('Name is required').isLength({ max: 50 }).withMessage('Name must be less than 50 characters'),
    body('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('Price must be a number'),
    body('description').notEmpty().withMessage('Description is required').isLength({ max: 255 }).withMessage('Description must be less than 255 characters'),
    body('category').notEmpty().withMessage('Category is required').isLength({ max: 50 }).withMessage('Category name must be less than 50 characters'),
    body('amount').notEmpty().withMessage('Amount is required').isNumeric().withMessage('Amount must be a number'),
    body('supplier').notEmpty().withMessage('Supplier is required').isMongoId().withMessage('Invalid supplier ID'), 
    body('entryDate').notEmpty().withMessage('Entry date is required').isDate().withMessage('Entry date must be a date'),
    body('expirationDate').notEmpty().withMessage('Expiration date is required').isDate().withMessage('Expiration date must be a date'),
    validateField,
    handleErrors
];

export const getProductValidator = [
    validateJWT,
    param('pid').isMongoId().withMessage('Invalid product ID'),
    param('pid').custom(productExists),
    validateField,
    handleErrors
];

export const updateProductValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    param('pid').isMongoId().withMessage('Invalid product ID'),
    param('pid').custom(productExists),
    body('name').optional().isLength({ max: 50 }).withMessage('Name must be less than 50 characters'),
    body('price').optional().isNumeric().withMessage('Price must be a number'),
    body('description').optional().isLength({ max: 255 }).withMessage('Description must be less than 255 characters'),
    body('category').optional().isLength({ max: 50 }).withMessage('Category name must be less than 50 characters'),
    body('amount').optional().isNumeric().withMessage('Amount must be a number'),
    body('entryDate').optional().isDate().withMessage('Entry date must be a date'),
    body('expirationDate').optional().isDate().withMessage('Expiration date must be a date'),
    validateField,
    handleErrors
];

export const deleteProductValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    param('pid').isMongoId().withMessage('Invalid product ID'),
    param('pid').custom(productExists),
    validateField,
    handleErrors
];

export const getProductsAdvancedValidator = [
    query('sort').optional().isIn(['asc', 'desc']).withMessage('Sort must be "asc" or "desc"'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('filter').optional().isString().withMessage('Filter must be a string'),
    validateField,
    handleErrors,
];