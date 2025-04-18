import { Router } from "express";
import { register, login } from "./auth.controller.js";

// Ajusta los imports de los middlewares según tu estructura
import { emailExists } from "../helpers/db-validators.js";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields.js";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *                 example: John Doe
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: StrongPassword123
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: johndoe@example.com
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 *     security: []
 */
router.post(
  "/register",
  validatorRegister,
  register
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: StrongPassword123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 *     security: []
 */
router.post(
  "/login",
  validatorLogin,
  login
);

export default router;