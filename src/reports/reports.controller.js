import Products from "../product/product.model.js";
import Exceljs from "exceljs"
import path from 'path';
import fs from 'fs';

export const generateInventory = async (req,res) => {
    try{
        const {directory} = req.body;
        const products = await Products.find({status: true});
        if (!products || products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found",
            });
        }

        const productsOnStock = products.filter(product => product.amount > 0);
        const productsOutStock = products.filter(product => product.amount === 0);
        
        const workbook = new Exceljs.Workbook()
        const worksheet = workbook.addWorksheet("Empresas")
     
        worksheet.columns = [
            {header: "Nombre", key: "name", width: 35},
            {header: "Cantidad", key: "quantity", width: 35},
            {header: "Precio", key: "price", width: 35},
            {header: "Categoria", key: "category", width: 35}

        ];
     
        products.forEach(product => {
            worksheet.addRow({
                name: product.name,
                quantity: product.amount,
                price: product.price,
                category: product.category || "No tiene categoria"
            })
        });

        const inventoryValue = productsOnStock.reduce((acc, product) => {
            return acc + (product.amount * product.price);
        }, 0);

        worksheet.addRow({name: "Productos en stock", quantity: "", category: productsOnStock.length});
        worksheet.addRow({name: "Productos sin stock", quantity: "", category: productsOutStock.length});
        worksheet.addRow({name: "Total de productos", quantity: "", category: products.length});
        worksheet.addRow({name: "Valor de inventario", quantity: "", category: inventoryValue }) ;


     
        const directoryPath = directory 
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath);
        }

        const dateNow = new Date();
        
        const date = dateNow.toISOString()
            .replace(/T/, '-')
            .replace(/\..+/, '')
            .replace(/:/g, '-');
        const filePath = path.join(directoryPath, `Inventory_${date}.xlsx`);

        await workbook.xlsx.writeFile(filePath);
     
        return res.status(200).json({
            success: true,
            message: "Inventory successfully generated",
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error generating inventory",
            error: err.message
        });
    }
}