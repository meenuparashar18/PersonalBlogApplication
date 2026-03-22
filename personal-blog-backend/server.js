require('dotenv').config();

// 2. Import Libraries
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Assuming you'll add/have cors

// NEW: Import your route files
const postRoutes = require('./routes/postRoutes');

// 3. Create an instance of an Express application
const app = express();

// --- MIDDLEWARE ---
// We will also add cors here for future-proofing our API for the React frontend
app.use(cors());
app.use(express.json());

// 4. Define the port
const PORT = process.env.PORT || 5000;

// NEW: Mount the routes
// This tells Express that for any request that starts with '/api/posts',
// it should be handled by the 'postRoutes' router.
app.use('/api/posts', postRoutes);

// 5. Create a function to connect to DB and start the server
const startServer = async () => {
  // ... (rest of your existing startServer function remains unchanged)
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('Successfully connected to MongoDB!');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

// 6. Call the function to start the server
startServer();