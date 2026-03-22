

// const express = require("express");
// const app = express();

// const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//     res.send("Server running 🚀");
// });

// app.listen(PORT, () => {
//     console.log(`hii running on port ${PORT}`);
// });

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// ✅ YEH LINE ADD KARO (VERY IMPORTANT)
app.use(express.json());

const PORT = process.env.PORT || 5000;

const startServer = async () => {
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

startServer();