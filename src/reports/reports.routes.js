import Router from "express"
import {generateInventory, generateMovements} from "./reports.controller.js"
import { validatorGenerateInventory, validatorGenerateMovements} from "../middlewares/reports-validator.js"

const router = Router()

router.get("/inventory", validatorGenerateInventory, generateInventory)
router.get("/movements", validatorGenerateMovements, generateMovements)

export default router