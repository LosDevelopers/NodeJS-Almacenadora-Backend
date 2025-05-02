import { Router } from 'express';
import { getLowStockProducts, getExpiringProducts } from './alerts.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Alerts
 *   description: Endpoints for product alerts
 */

/**
 * @swagger
 * /api/alerts/low-stock:
 *   get:
 *     summary: Get all products with stock less than 50 units
 *     tags: [Alerts]
 *     responses:
 *       200:
 *         description: List of low stock products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Low stock products fetched successfully
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
router.get('/low-stock', getLowStockProducts);

/**
 * @swagger
 * /api/alerts/expiring:
 *   get:
 *     summary: Get all products that will expire in the next month
 *     tags: [Alerts]
 *     responses:
 *       200:
 *         description: List of expiring products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Expiring products fetched successfully
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
router.get('/expiring', getExpiringProducts);

export default router;
