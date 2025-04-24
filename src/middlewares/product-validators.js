import { body, param, query } from 'express-validator';
import { productExists, categoryExists, supplierExists } from "../helpers/db-validators.js"
import { validarCampos } from "./validate-fields.js"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"
import { handleErrors } from "./handle-errors.js"

export const createProductValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    body('name').notEmpty().withMessage('Name is required').isLength({ max: 50 }).withMessage('Name must be less than 50 characters'),
    body('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('Price must be a number'),
    body('description').notEmpty().withMessage('Description is required').isLength({ max: 255 }).withMessage('Description must be less than 255 characters'),
    body('Category').custom(categoryExists),
    body('amount').notEmpty().withMessage('Amount is required').isNumeric().withMessage('Amount must be a number'),
    body('supplier').custom(supplierExists),
    body('entryDate').notEmpty().withMessage('Entry date is required').isDate().withMessage('Entry date must be a date'),
    body('expirationDate').notEmpty().withMessage('Expiration date is required').isDate().withMessage('Expiration date must be a date'),
    validarCampos,
    handleErrors
];

export const getProductValidator = [
    validateJWT,
    param('pid').isMongoId().withMessage('Invalid product ID'),
    param('pid').custom(productExists),
    validarCampos,
    handleErrors
];

export const updateProductValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    param('pid').isMongoId().withMessage('Invalid product ID'),
    param('pid').custom(productExists),
    body('name').optional().withMessage('Name is required').isLength({ max: 50 }).withMessage('Name must be less than 50 characters'),
    body('price').optional().withMessage('Price is required').isNumeric().withMessage('Price must be a number'),
    body('description').optional().withMessage('Description is required').isLength({ max: 255 }).withMessage('Description must be less than 255 characters'),
    body('Category').optional().custom(categoryExists),
    body('amount').optional().withMessage('Amount is required').isNumeric().withMessage('Amount must be a number'),
    body('supplier').optional().custom(supplierExists),
    body('entryDate').optional().withMessage('Entry date is required').isDate().withMessage('Entry date must be a date'),
    body('expirationDate').optional().withMessage('Expiration date is required').isDate().withMessage('Expiration date must be a date'),
    validarCampos,
    handleErrors
];

export const deleteProductValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    param('pid').isMongoId().withMessage('Invalid product ID'),
    param('pid').custom(productExists),
    validarCampos,
    handleErrors
];

export const getProductsAdvancedValidator = [
    query('sort').optional().isIn(['asc', 'desc']).withMessage('Sort must be "asc" or "desc"'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('filter').optional().isString().withMessage('Filter must be a string'),
    validarCampos,
    handleErrors,
];