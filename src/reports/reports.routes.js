import Router from "express"
import {generateInventory, generateMovements, generateStats} from "./reports.controller.js"
import { validatorGenerateReport, validatorGenerateMovements} from "../middlewares/reports-validator.js"

const router = Router()

router.get("/inventory", validatorGenerateReport, generateInventory)
router.get("/movements", validatorGenerateMovements, generateMovements)
router.get("/statistics", validatorGenerateReport, generateStats)

export default router