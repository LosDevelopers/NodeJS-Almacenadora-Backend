import Router from "express"
import {generateInventory, generateMovements, generateStats} from "./reports.controller.js"
import { validatorGenerateReport, validatorGenerateMovements} from "../middlewares/reports-validator.js"

const router = Router()

router.post("/inventory", validatorGenerateReport, generateInventory)
router.post("/movements", validatorGenerateMovements, generateMovements)
router.post("/statistics", validatorGenerateReport, generateStats)

export default router