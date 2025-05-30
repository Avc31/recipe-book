import mongoose from 'mongoose';

const recipesSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true, // Automatically generate ObjectId if not provided
    },
    title: {
        type: String,
        required: [true, 'Please enter the name of your recipe'],
    },
    description: {
        type: String,
        required: [true, 'Please enter short description'],
    },
    fullRecipe: {
        type: String,
        required: [true, 'Please enter your full recipe'],
    },
    imgurl: {
        type: String,
        required: [true, 'Please enter the image URL of your recipe'],
    },
    userName: {
        type: String,
        required: [true, 'get username'],
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically add a creation date
    },
    reviews: [
        {
            reviewer: { type: String, required: true }, // Name or ID of the reviewer
            rating: { type: Number, required: true, min: 1, max: 5 },
            comment: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ]
});

// Export the model, or use the existing one if already compiled
export default mongoose.models.Recipe || mongoose.model('Recipe', recipesSchema);
