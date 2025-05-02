import { Router } from 'express';
import {
    registerMovement,
    getMovements,
    getMovementById,
    getMovementsByProduct,
    deleteMovement,
    updateMovement
} from './movements.controller.js';
import {
    registerMovementValidator,
    getMovementValidator,
    getMovementsValidator,
    deleteMovementsByIdMovement,
    updateMovementById
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

/**
 * @swagger
 * /movements/{pid}:
 *   get:
 *     summary: Get all movements for a specific product
 *     tags: [Movements]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: List of movements for the specified product
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
 *       404:
 *         description: Product not found or no movements available
 *       500:
 *         description: Server error
 */
router.get('/movement/:pid', getMovementsByProduct);

/**
 * @swagger
 * /movements/{mid}:
 *   delete:
 *     summary: Delete a specific movement by ID
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
 *         description: Movement deleted successfully
 *       404:
 *         description: Movement not found
 *       500:
 *         description: Server error
 */
router.delete('/movementsDelete/:mid',deleteMovementsByIdMovement, deleteMovement);

/**
 * @swagger
 * /movements/{mid}:
 *   put:
 *     summary: Update a specific movement by ID
 *     tags: [Movements]
 *     parameters:
 *       - in: path
 *         name: mid
 *         required: true
 *         schema:
 *           type: string
 *         description: Movement ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *               employee:
 *                 type: string
 *                 description: Employee ID
 *               entryDate:
 *                 type: string
 *                 format: date
 *                 description: Entry date
 *               departureDate:
 *                 type: string
 *                 format: date
 *                 description: Departure date
 *               destination:
 *                 type: string
 *                 description: Destination for the movement
 *     responses:
 *       200:
 *         description: Movement updated successfully
 *       404:
 *         description: Movement not found
 *       500:
 *         description: Server error
 */
router.put('/movementsUpdate/:mid', updateMovementById, updateMovement);

export default router;
