"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import { swaggerDocs, swaggerUi } from "./swagger.js";
import apiLimiter from "../src/middlewares/rate-limit-validator.js";
import authRouter from "../src/auth/auth.routes.js";
import userRouter from "../src/user/user.routes.js";
import productRouter from "../src/product/product.routes.js";
import movementRouter from "../src/movements/movements.routes.js";
import supplierRouter from "../src/supplier/supplier.routes.js";
import { createAdmin } from "./default-data.js"
import customersRoutes from "../src/customer/customer.routes.js"
<<<<<<< Updated upstream
import reportsRoutes from "../src/reports/reports.routes.js";
=======
import alertsRouter from "../src/alerts/alerts.routes.js";

>>>>>>> Stashed changes

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(apiLimiter);
}

const routes = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    app.use("/Almacenadora/v1/auth", authRouter);
    app.use("/Almacenadora/v1/clients", userRouter);
    app.use("/Almacenadora/v1/products", productRouter);
    app.use("/Almacenadora/v1/movements", movementRouter);
    app.use("/Almacenadora/v1/suppliers", supplierRouter);
    app.use("/Almacenadora/v1/customer", customersRoutes);
<<<<<<< Updated upstream
    app.use("/Almacenadora/v1/reports", reportsRoutes);
=======
    app.use("/Almacenadora/v1/alerts", alertsRouter);
>>>>>>> Stashed changes
}

const conectarDB = async () => {
    try {
        await dbConnection();
    } catch (err) {
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
};

export const initServer = () => {
    const app = express();
    try {
        middlewares(app);
        conectarDB();
        routes(app);
        createAdmin();
        const port = process.env.PORT;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
};