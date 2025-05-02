import { Schema, model } from "mongoose";

const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    users: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    },
    contactInformation: {
        type: String,
        required: true
    },
    movements: [
        {
            type: Schema.Types.ObjectId,
            ref: "Movement"
        }
    ],
    status: {
        type: Boolean,
        default: true
    }
});

customerSchema.methods.toJSON = function () {
    const { status, _id, ...customer } = this.toObject();
    customer.cid = _id;
    return customer;
};

export default model("Customer", customerSchema);