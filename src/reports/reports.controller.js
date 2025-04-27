import Products from "../product/product.model.js";
import Movements from "../movements/movements.model.js";
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
        const worksheet = workbook.addWorksheet("Inventory")
     
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


export const generateMovements = async (req,res) => {
    try{
        const { directory, startDate, endDate } = req.body;

        if (!startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: "Start date and end date are required",
            });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format"
            });
        }

        const entryMovements = await Movements.find({
            entryDate: { $gte: start, $lte: end },
            type: "entry"
        }).populate("product", "name").populate("employee", "name");

        const exitMovements = await Movements.find({
            departureDate: { $gte: start, $lte: end },
            type: "exit"
        }).populate("product", "name");


        if (entryMovements.length === 0 && exitMovements.length === 0){
                return res.status(404).json({
                success: false,
                message: "No movements found in the specified date range",
            });
        }
        
        const workbook = new Exceljs.Workbook()
        const worksheetEntry = workbook.addWorksheet("Movimientos de entrada")
        const worksheetExit = workbook.addWorksheet("Movimientos de salida")

        worksheetEntry.columns = [
            {header: "Producto", key: "product", width: 35},
            {header: "Tipo", key: "type", width: 35},
            {header: "Cantidad", key: "quantity", width: 35},
            {header: "fecha", key: "date", width: 35},
            {header: "Nota", key: "note", width: 35},
            {header: "Encargado", key: "employee", width: 35},
        ];
     
        entryMovements.forEach(entry => {
            worksheetEntry.addRow({
                product: entry.product.name,
                type: entry.type,
                quantity: entry.quantity,
                date: entry.entryDate || entry.updatedAt,
                note: entry.note || "No tiene nota",
                employee: entry.employee ? entry.employee.name : "No tiene encargado"
            })
        });

        worksheetExit.columns = [
            {header: "Producto", key: "product", width: 35},
            {header: "Tipo", key: "type", width: 35},
            {header: "Cantidad", key: "quantity", width: 35},
            {header: "fecha", key: "date", width: 35},
            {header: "Nota", key: "note", width: 35},
            {header: "Destino", key: "destinantion", width: 35},
        ];
     
        exitMovements.forEach(exit => {
            worksheetExit.addRow({
                product: exit.product.name,
                type: exit.type,
                quantity: exit.quantity,
                date: exit.departureDate || exit.updatedAt,
                note: exit.note || "No tiene nota",
                destinantion: exit.destination || "No tiene destino", 
            })
        });

        const totalMovements = entryMovements.length + exitMovements.length;

        worksheetExit.addRow([
            `Movimientos de ${start.toLocaleDateString()} a ${end.toLocaleDateString()}: ${totalMovements}`
        ]);

        worksheetEntry.addRow([
            `Movimientos de ${start.toLocaleDateString()} a ${end.toLocaleDateString()}: ${totalMovements}`
        ]);

        const directoryPath = directory 
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath);
        }

        const dateNow = new Date();
        
        const date = dateNow.toISOString()
            .replace(/T/, '-')
            .replace(/\..+/, '')
            .replace(/:/g, '-');
        const filePath = path.join(directoryPath, `Movements_${date}.xlsx`);

        await workbook.xlsx.writeFile(filePath);
     
        return res.status(200).json({
            success: true,
            message: "Report successfully generated",
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error generating Report",
            error: err.message
        });
    }
}