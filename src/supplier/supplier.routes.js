import { Router } from "express";
import { validatorAddSupplier, validatorGetSupplier, validatorUpdateSupplier, validatorDeleteSupplier } from "../middlewares/supplier-validator.js";

import { getSuppliers, addSupplier, getSupplierById, deleteSupplier, updateSupplier } from "./supplier.controller.js";

const router = Router();


router.post("/addSupplier", validatorAddSupplier, addSupplier);

router.get("/getSuppliers", validatorGetSupplier, getSuppliers);

router.get("/getUserById/:uid", validatorGetSupplier, getSupplierById);

router.delete("/deleteSupplier/:uid", validatorDeleteSupplier, deleteSupplier);

router.put("/updateSupplier/:uid", validatorUpdateSupplier, updateSupplier);


export default router;

