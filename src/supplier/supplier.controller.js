import Supplier from "./supplier.model.js";


export const addSupplier = async (req, res) => {
    try {
        const data = req.body;

        const supplier = await Supplier.create(data);

        return res.status(201).json({
            message: "Supplier successfully registered",
            success: true,
            id: supplier._id,
            name: supplier.name,
        });

    } catch (err) {
        return res.status(500).json({
            message: "Supplier registration failed",
            success: false,
            error: err.message
        });
    }
}

export const getSuppliers = async (req, res) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { status: true };

        const [total, users] = await Promise.all([
            Supplier.countDocuments(query),
            Supplier.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        return res.status(200).json({
            success: true,
            total,
            users
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error getting suppliers",
            error: err.message
        });
    }
};

export const getSupplierById = async (req, res) => {
    try {
        const { uid } = req.params;
        const supplier = await Supplier.findById(uid);

        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: "Supplier not found"
            });
        }

        if (!supplier.status) {
            return res.status(404).json({
                success: false,
                message: "Supplier removed"
            });
        }

        return res.status(200).json({
            success: true,
            supplier
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error getting supplier",
            error: err.message
        });
    }
};


export const updateSupplier = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        const updateSupplier = await Supplier.findByIdAndUpdate(uid, data, { new: true });

        return res.status(200).json({
            success: true,
            message: 'updated supplier',
            supplier: updateSupplier,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Failed to update the provider',
            error: err.message
        });
    }
};

export const deleteSupplier = async (req, res) => {
    try {
        const { uid } = req.params;

        const supplier = await Supplier.findByIdAndUpdate(uid, { status: false }, { new: true });

        if (supplier) {
            return res.status(200).json({
                success: true,
                message: "Removed supplier"
            });
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error when deleting supplier",
            error: err.message
        });
    }
};
