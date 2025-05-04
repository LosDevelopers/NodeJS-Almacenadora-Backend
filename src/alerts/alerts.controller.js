import Product from '../product/product.model.js';
import dayjs from 'dayjs'; 

export const getLowStockProducts = async (req, res) => {
    try {

        const allProducts = await Product.find({ status: true });

        const lowStockProducts = allProducts.filter(product => product.amount < 50);

        return res.status(200).json({
            success: true,
            message: 'Low stock products fetched successfully',
            products: lowStockProducts
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Error fetching low stock products',
            error: err.message
        });
    }
};

export const getExpiringProducts = async (req, res) => {
    try {
        const today = new Date();
        const nextMonth = dayjs(today).add(1, 'month').toDate();


        const allProducts = await Product.find({ status: true });


        const expiringProducts = allProducts.filter(product => {
            return product.expirationDate <= nextMonth;
        });

        return res.status(200).json({
            success: true,
            message: 'Expiring products fetched successfully',
            products: expiringProducts
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Error fetching expiring products',
            error: err.message
        });
    }
};
