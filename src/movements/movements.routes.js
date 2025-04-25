import { Router } from 'express';
import {
    registerMovement,
    getMovements,
    getMovementById
} from './movements.controller.js';
import {
    registerMovementValidator,
    getMovementValidator,
    getMovementsValidator
} from '../middlewares/movements-validators.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Movements
 *   description: API for registering and tracking product movements
 */

/**
 * @swagger
 * /movements:
 *   post:
 *     summary: Register a product entry or exit
 *     tags: [Movements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - type
 *               - quantity
 *             properties:
 *               product:
 *                 type: string
 *                 description: Product ID
 *               type:
 *                 type: string
 *                 enum: [entry, exit]
 *                 description: Movement type (entry or exit)
 *               quantity:
 *                 type: number
 *                 description: Number of items being added or removed
 *               note:
 *                 type: string
 *                 description: Optional note or reason for the movement
 *     responses:
 *       201:
 *         description: Movement registered successfully
 *       400:
 *         description: Validation error
 */
router.post('/newMovement', registerMovementValidator, registerMovement);

/**
 * @swagger
 * /movements:
 *   get:
 *     summary: Get all product movements
 *     tags: [Movements]
 *     responses:
 *       200:
 *         description: List of all product movements
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 movements:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       type:
 *                         type: string
 *                         enum: [entry, exit]
 *                       quantity:
 *                         type: number
 *                       note:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Server error
 */
router.get('/', getMovementsValidator, getMovements);

/**
 * @swagger
 * /movements/{mid}:
 *   get:
 *     summary: Get a specific movement by ID
 *     tags: [Movements]
 *     parameters:
 *       - in: path
 *         name: mid
 *         required: true
 *         schema:
 *           type: string
 *         description: Movement ID
 *     responses:
 *       200:
 *         description: Movement found
 *       404:
 *         description: Movement not found
 */
router.get('/movements/:mid', getMovementValidator, getMovementById);

export default router;
