import mongoose from "mongoose";

const connectDb = async () => {
    if (mongoose.connections[0].readyState) {
        // If already connected, return
        console.log('Already connected to the database.');
        return;
    }

    try {
        // Connect to your MongoDB instance
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to the database.');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Exit the process if unable to connect
    }
};


export default connectDb;
