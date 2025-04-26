import Product from './product.model.js';

export const addProduct = async (req, res) => {
    try {
        const data = req.body;

        const product = await Product.create(data);

        return res.status(201).json({
            message: 'Product created successfully',
            product
        });
    } catch ( err ) {
        return res.status(500).json({
            message: 'Error creating product',
            error: err.message
        });
    } 
}

export const getproduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await Product.findById(pid);

        if ( !product ) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            success: true,
            product
        })

    } catch ( err ) {
        return res.status(500).json({
            message: 'Error getting product',
            error: err.message
        });
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        return res.status(200).json({
            success: true,
            products
        });
    } catch ( err ) {
        return res.status(500).json({
            message: 'Error getting products',
            error: err.message
        });
    }
}

export const getProductsAdvanced = async (req, res) => {
    try {
        const { sort = 'asc', limit = 10, page = 1, filter = '' } = req.query;

        const sortOrder = sort === 'desc' ? -1 : 1;
        const skip = (page - 1) * limit;

        const query = filter
            ? { name: { $regex: filter, $options: 'i' }, status: true }
            : { status: true };

        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .sort({ name: sortOrder })
                .skip(Number(skip))
                .limit(Number(limit))
                //.populate('supplier'),
        ]);

        return res.status(200).json({
            success: true,
            total,
            products,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Error getting products',
            error: err.message,
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const data = req.body;

        const product = await Product.findByIdAndUpdate(pid, data, { new: true });

        if ( !product ) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product
        });
    } catch ( err ) {
        return res.status(500).json({
            message: 'Error updating product',
            error: err.message
        });
    }
}

export const deleteProduct = async (req, res) => {
    try {

        const { pid } = req.params;

        const product = await Product.findByIdAndUpdate(pid, { status: false }, { new: true });

        if ( !product ) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
            product
        });
    } catch ( err ) {
        return res.status(500).json({
            message: 'Error deleting product',
            error: err.message
        });
    }
}
