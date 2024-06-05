import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {
    if (connection.isConnected) {
        // console.log("Already connected to DB");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {});
        connection.isConnected = db.connections[0].readyState;
        // console.log('Success: Connected to MongoDB');
    } catch (error) {
        console.log("Error connecting to the database", error);
        process.exit(1);
    }
}

export default dbConnect;
