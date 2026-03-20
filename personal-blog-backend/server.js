// require("dotenv").config();

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
const mongoose = require('mongoose'); // 1. Mongoose import karein

const app = express();
const PORT = process.env.PORT || 5000;

// 2. Connection function banayein
const startServer = async () => {
    try {
        // Database connect hone ka wait karein
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Successfully connected to MongoDB!');

        // Connection ke baad hi server listen karega
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1); // Error aaye toh app band kar dein
    }
};

startServer();