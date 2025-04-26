import { Schema, model } from "mongoose";

const supplierSchema = Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [60, "Name cannot exceed 60 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    phone:{
        type: Number,
    },
    address:{
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    }
});

supplierSchema.methods.toJSON = function () {
    const { _id, _status, ...supplier } = this.toObject();
    supplier.uid = _id;
    return supplier;
};

export default model("Supplier", supplierSchema);
