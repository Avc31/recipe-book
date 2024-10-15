import mongoose from 'mongoose';

const recipesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter the name of your recipe'],
    },
    description: {
        type: String,
        required: [true, 'Please enter your full recipe'],
    },
    imgurl: {
        type: String,
        required: [true, 'Please enter the image URL of your recipe'],
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically add a creation date
    },
});

// Export the model, or use the existing one if already compiled
export default mongoose.models.Recipe || mongoose.model('Recipe', recipesSchema);
