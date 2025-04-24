import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [35, "Name cannot exceed 35 characters"]
    },
    email: { 
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        required: true,
        default: "CLIENT_ROLE",
        enum: ["ADMIN_ROLE", "CLIENT_ROLE", "HOST_ROLE"]
    },
    registerdate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    }
})

userSchema.methods.toJSON = function() {    
    const { password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

export default model("User", userSchema)