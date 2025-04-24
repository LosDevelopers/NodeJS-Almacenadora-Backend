import {Schema, model} from "mongoose";

const customerSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    enterprise:{
        type: String,
    },
    contactInformation:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
})

customerSchema.methods.toJSON = function(){
    const {status, _id, ...customer } = this.toObject();
    customer.cid = _id
    return customer
}

export default model('Customer', customerSchema);