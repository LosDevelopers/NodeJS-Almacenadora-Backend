import Product from '../product/product.model.js';
import Movement from '../movements/movements.model.js';

export const registerMovement = async (req, res) => {
    try {
        let movement;
        const { product, type, quantity, note, employee, entryDate, departureDate, destination } = req.body;

        if (!['entry', 'exit'].includes(type)) {
            return res.status(400).json({ message: 'Invalid movement type. Use "entry" or "exit".' });
        }

        const parsedQuantity = Number(quantity);
        if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be a positive number.' });
        }

        const productData = await Product.findById(product).populate('supplier', 'name email phone address');
        if (!productData) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (!productData.supplier) {
            return res.status(400).json({ message: 'Product does not have a valid supplier.' });
        }

        if (typeof productData.amount !== 'number' || isNaN(productData.amount)) {
            return res.status(400).json({ message: 'Product amount is not valid.' });
        }

        if (type === 'entry') {
            productData.amount += parsedQuantity;
        } else {
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
                quantity: parsedQuantity,
                entryDate: entryDate || formatDate(Date.now()),
                note,
                employee
            });
        } else {
            movement = await Movement.create({
                product,
                type,
                quantity: parsedQuantity,
                departureDate: departureDate || formatDate(Date.now()),
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
            .populate('employee', 'email')
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
};

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
};

export const deleteMovement = async (req, res) => {
    try {
        const { mid } = req.params;
        const movement = await Movement.findByIdAndDelete(mid);
        if (!movement) {
            return res.status(404).json({ message: 'Movement not found' });
        }
        return res.status(200).json({
            success: true,
            message: 'Movement deleted successfully'
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Error deleting movement',
            error: err.message
        });
    }
};

export const updateMovement = async (req, res) => {
    try {
        const { mid } = req.params;
        const { product, type, quantity, note, employee, entryDate, departureDate, destination } = req.body;

        const movement = await Movement.findById(mid);
        if (!movement) {
            return res.status(404).json({ message: 'Movement not found' });
        }

        if (product) movement.product = product;
        if (type) movement.type = type;
        if (quantity) movement.quantity = quantity;
        if (note) movement.note = note;
        if (employee) movement.employee = employee;
        if (entryDate) movement.entryDate = entryDate;
        if (departureDate) movement.departureDate = departureDate;
        if (destination) movement.destination = destination;

        await movement.save();

        return res.status(200).json({
            success: true,
            message: 'Movement updated successfully',
            movement
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Error updating movement',
            error: err.message
        });
    }
};