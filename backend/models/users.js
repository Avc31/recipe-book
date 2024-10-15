import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your full name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
    },
    password: {
        type: String,
        required: [true, 'Please enter the password'],
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically add a creation date
    },
});

// Export the model, or use the existing one if already compiled
export default mongoose.models.User || mongoose.model('User', usersSchema);
