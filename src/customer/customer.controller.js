import Customer from "../customer/customer.model.js"

export const addCustomers = async (req, res) => {
    try {
        const data = req.body;
        const customer = await Customer.create(data);
        return res.status(201).json({
            message: "Customer has been registered successfully",
            customer
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to register the customer",
            error: err.message
        });
    }
};

export const customersList = async (req, res) => {
    try {
        const query = { status: true };
        const customers = await Customer.find(query)
            .populate("enterprise", "name")
            .populate("movements", "type quantity date note"); // Relación con movimientos
        return res.status(200).json(customers);
    } catch (err) {
        return res.status(500).json({
            message: "Failed to obtain the customers",
            error: err.message
        });
    }
};

export const editCustomers = async (req, res) => {
    try {
        const { cid } = req.params;
        const data = req.body;
        const customer = await Customer.findByIdAndUpdate(cid, data, { new: true })
            .populate("enterprise", "name")
            .populate("movements", "type quantity date note");
        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }
        return res.status(200).json({
            message: "Customer successfully updated",
            customer
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error updating the customer",
            error: err.message
        });
    }
};

export const deleteCustomer = async (req, res) => {
    try {
        const { cid } = req.params;
        const customer = await Customer.findByIdAndUpdate(cid, { status: false }, { new: true });
        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Customer eliminated",
            customer
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error deleting customer",
            error: err.message
        });
    }
};