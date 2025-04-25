import { model, Schema } from 'mongoose';

const movementSchema = Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product is required']
    },
    type: {
        type: String,
        enum: ['entry', 'exit'],
        required: [true, 'Movement type is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1']
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    note: {
        type: String,
        maxlength: [255, 'Note must be less than 255 characters']
    },
    
}, {
    versionKey: false,
    timestamps: true
});

movementSchema.methods.toJSON = function () {
    const { __v, _id, ...movement } = this.toObject();
    movement.mid = _id;
    return movement;
};

export default model('Movement', movementSchema);
