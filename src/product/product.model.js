import { model, Schema } from 'mongoose';

const productSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxlength: [50, 'Name must be less than 50 characters']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be greater than or equal to 0']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [255, 'Description must be less than 255 characters']
    },
    category: {
        type: String,
        required: [true, 'Category name is required'],
        maxlength: [50, 'Category name must be less than 50 characters']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [0, 'Amount must be greater than or equal to 0']
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
        required: [true, 'Supplier is required']
    },
    entryDate: {
        type: Date,
        required: [true, 'Entry date is required'],
        default: Date.now
    },
    expirationDate: {
        type: Date,
        required: [true, 'Expiration date is required'],
    },
    status: {
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timestamps: true
});

productSchema.methods.toJSON = function() {
    const { __v, _id, ...products } = this.toObject();
    products.pid = _id;
    return products;
};

export default model('Product', productSchema);