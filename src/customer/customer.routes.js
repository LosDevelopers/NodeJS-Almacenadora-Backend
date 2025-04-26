import { Router } from "express";
import { addCustomersValidator, deleteCustomerValidator, editCustomersValidator } from "../middlewares/customer.validator.js";
import { addCustomers, customersList, deleteCustomer, editCustomers } from "./customer.controller.js";

const router = Router()

router.post(
    "/addCustomers",
    addCustomersValidator,
    addCustomers
)

router.get(
    "/customersList",
    customersList
)

router.put(
    "/customers/:cid",
    editCustomersValidator,
    editCustomers
)

router.delete(
    "/deleteCustomer/:cid",
    deleteCustomerValidator,
    deleteCustomer
)

export default router;