import 'dotenv/config';
import mongoose from 'mongoose';

async function wipeDatabase() {
  try {
    console.log("🔄 Connecting to MongoDB Atlas to clear bad data...");
    await mongoose.connect(process.env.MONGO_URI);
    
    // This wipes out the entire documents collection instantly from the backend!
    await mongoose.connection.collection('documents').drop();
    console.log("🗑️ SUCCESS! All old, corrupted empty records have been completely deleted.");
  } catch (error) {
    console.log("🧹 Collection was already empty or clean:", error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

wipeDatabase();