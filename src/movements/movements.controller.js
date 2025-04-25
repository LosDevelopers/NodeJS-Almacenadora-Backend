import Product from '../product/product.model.js';
import Movement from '../movements/movements.model.js';


export const registerMovement = async (req, res) => {
    try {
        const { product, type, quantity, note } = req.body;


        if (!['entry', 'exit'].includes(type)) {
            return res.status(400).json({ message: 'Invalid movement type. Use "entry" or "exit".' });
        }


        const productData = await Product.findById(product);
        if (!productData) {
            return res.status(404).json({ message: 'Product not found' });
        }


        if (type === 'entry') {
            productData.amount += quantity;
        } 

        else {
            if (productData.amount < quantity) {
                return res.status(400).json({ message: 'Not enough product in stock' });
            }
            productData.amount -= quantity;
        }


        await productData.save();


        const movement = await Movement.create({
            product,
            type,
            quantity,
            note,
        });

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
