import mongoose from "mongoose";

export const connDB = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.MONGODB_URL || 'mongodb+srv://ibrahimkamal314_db_user:zCuLs53aUZlZ5cyP@cluster0.zfohi48.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1);
    }
};


