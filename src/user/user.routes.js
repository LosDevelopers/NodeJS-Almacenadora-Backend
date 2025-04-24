import { Router } from "express";
import { getUserById, getUsers, deleteUserClient, updatePassword, updateUserUser } from "./user.controller.js";
import { getUserByIdValidator, updatePasswordValidator, deleteUserValidatorAdmin, updateUserValidatorClient } from "../middlewares/user-validator.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: API for managing client users
 */

/**
 * @swagger
 * /clients/findUser/{uid}:
 *   get:
 *     summary: Get a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Client ID
 *     responses:
 *       200:
 *         description: Client found
 *       404:
 *         description: Client not found
 */
router.get("/findUser/:uid", getUserByIdValidator, getUserById);

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: List of clients
 */
router.get("/", getUsers);

/**
 * @swagger
 * /clients/deleteUser:
 *   delete:
 *     summary: Delete a client account
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Client deleted
 *       404:
 *         description: Client not found
 */
router.delete("/deleteUser/:uid", deleteUserValidatorAdmin, deleteUserClient);

/**
 * @swagger
 * /clients/updatePassword:
 *   patch:
 *     summary: Update client password
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated
 *       400:
 *         description: Validation error
 */
router.patch("/updatePassword", updatePasswordValidator, updatePassword);

/**
 * @swagger
 * /clients/updateUser:
 *   put:
 *     summary: Update client information
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client updated
 *       400:
 *         description: Validation error
 */
router.put("/updateUser", updateUserValidatorClient, updateUserUser);

export default router;