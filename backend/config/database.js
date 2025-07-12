const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/skillswap', {
      // MongoDB Atlas optimized settings
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority'
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('Database connection error:', error);
    if (process.env.MONGODB_URI) {
      console.log('Note: Please check your MongoDB Atlas connection string and network access settings');
    } else {
      console.log('Note: MONGODB_URI environment variable not set. Please set it to your MongoDB Atlas connection string');
    }
    // Don't exit process, just log the error
  }
};

module.exports = connectDB; 