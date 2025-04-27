import Router from "express"
import {generateInventory} from "./reports.controller.js"
import { validatorGenerateInventory } from "../middlewares/reports-validator.js"

const router = Router()

router.get("/inventory", validatorGenerateInventory, generateInventory)

export default router