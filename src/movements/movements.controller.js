import Product from '../product/product.model.js';
import Movement from '../movements/movements.model.js';



export const registerMovement = async (req, res) => {
    try {
        let movement
        const { product, type, quantity, note, employee, entryDate, departureDate, destination} = req.body;


        if (!['entry', 'exit'].includes(type)) {
            return res.status(400).json({ message: 'Invalid movement type. Use "entry" or "exit".' });
        }


        const productData = await Product.findById(product);
        if (!productData) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const parsedQuantity = Number(quantity);

        if (type === 'entry') {
            productData.amount += parsedQuantity;
        } 

        else {
            if (productData.amount < parsedQuantity) {
                return res.status(400).json({ message: 'Not enough product in stock' });
            }
            productData.amount -= parsedQuantity;
        }


        await productData.save();

        const formatDate = (date) => {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0'); 
            const day = String(d.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        if (type === 'entry') {
            movement = await Movement.create({
                product,
                type,
                quantity,
                entryDate: entryDate ||  formatDate(Date.now()),
                note,
                employee
            });
        } else {
            movement = await Movement.create({
                product,
                type,
                quantity,
                departureDate: departureDate ||  formatDate(Date.now()),
                note,
                destination
            });
        }

        return res.status(201).json({
            message: `Product ${type === 'entry' ? 'entry' : 'exit'} registered successfully`,
            movement
        });

    } catch (err) {
        return res.status(500).json({
            message: 'Error registering movement',
            error: err.message
        });
    }
};


export const getMovements = async (req, res) => {
    try {
        const movements = await Movement.find()
            .populate('product', 'name') 
            .sort({ date: -1 }); 

        return res.status(200).json({
            success: true,
            movements
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Error getting movements',
            error: err.message
        });
    }
};


export const getMovementById = async (req, res) => {   
    try {
        const { mid } = req.params;
        const movement = await Movement.findById(mid).populate('product', 'name');
        if (!movement) {
            return res.status(404).json({ message: 'Movement not found' });
        }
        return res.status(200).json({
            success: true,
            movement
        });
    }
    catch (err) {
        return res.status(500).json({
            message: 'Error getting movement',
            error: err.message
        });
    }
}

export const getMovementsByProduct = async (req, res) => { 
    try {
        const { pid } = req.params;
        const movements = await Movement.find({ product: pid }).populate('product', 'name').sort({ date: -1 });
        if (!movements) {
            return res.status(404).json({ message: 'No movements found for this product' });
        }
        return res.status(200).json({
            success: true,
            movements
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Error getting movements',
            error: err.message
        });
    }
}
