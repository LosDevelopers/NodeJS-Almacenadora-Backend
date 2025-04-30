import mongoose from "mongoose";
import Customer from "../customer/customer.model.js";

export const addCustomers = async (req, res) => {
    try {
        const data = req.body;

        if (!mongoose.Types.ObjectId.isValid(data.users)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID",
            });
        }

        const customer = await Customer.create(data);

        return res.status(201).json({
            success: true,
            message: "Customer has been registered successfully",
            customer,
        });
    } catch (err) {
        console.error("Error registering customer:", err.message);
        return res.status(500).json({
            success: false,
            message: "Failed to register the customer",
            error: err.message,
        });
    }
};

export const customersList = async (req, res) => {
    try {
        const customers = await Customer.find({ status: true })
            .populate("users", "name email") 
            .populate("movements", "type quantity date note"); 

        if (!customers.length) {
            return res.status(404).json({
                success: false,
                message: "No customers found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Customers fetched successfully",
            customers,
        });
    } catch (err) {
        console.error("Error fetching customers:", err.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch customers",
            error: err.message,
        });
    }
};

export const editCustomers = async (req, res) => {
    try {
        const { cid } = req.params; 
        const data = req.body; 

        if (!mongoose.Types.ObjectId.isValid(cid)) {
            return res.status(400).json({
                success: false,
                message: "Invalid customer ID",
            });
        }

        if (data.users && !mongoose.Types.ObjectId.isValid(data.users)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID",
            });
        }

        const customer = await Customer.findByIdAndUpdate(cid, data, { new: true })
            .populate("users", "name email") 
            .populate("movements", "type quantity date note"); 

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Customer successfully updated",
            customer,
        });
    } catch (err) {
        console.error("Error updating customer:", err.message);
        return res.status(500).json({
            success: false,
            message: "Error updating the customer",
            error: err.message,
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