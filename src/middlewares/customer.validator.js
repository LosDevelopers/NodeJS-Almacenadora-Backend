import {body, param} from 'express-validator'
import {validateField} from './validate-fields.js'
import {customerExists} from "../helpers/db-validators.js"
import {handleErrors} from "./handle-errors.js"

export const addCustomersValidator = [
    body("name").not().isEmpty().withMessage("NOMBRE ES REQUERIDO"),
    body("enterprise").not().isEmpty().withMessage("EMPRESA ES REQUERIDO"),
    validateField
];

export const editCustomersValidator = [
    body("name").optional().not().isEmpty().withMessage("NOMBRE ES REQUERIDO"),
    body("enterprise").optional().not().isEmpty().withMessage("EMPRESA ES REQUERIDO"),
    validateField
];

export const deleteCustomerValidator = [
    param("cid").isMongoId().withMessage("NO ES UN ID VALIDO"),
    param("cid").custom(customerExists),
    validateField,
    handleErrors
]