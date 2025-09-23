// Import dependencies
const express = require('express');       // Web server
const mongoose = require('mongoose');     // MongoDB ORM
const bodyParser = require('body-parser'); // To parse JSON from frontend
const cors = require('cors');             // To allow frontend to talk to backend

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mywebpageDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

// Define a schema for storing form data
const FormDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

// Create a model from the schema
const FormData = mongoose.model('FormData', FormDataSchema);

// API route to save data from frontend
app.post('/submit', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const data = new FormData({ name, email, message });
        await data.save(); // Save to database
        res.json({ success: true, message: "Data saved successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error saving data" });
    }
});

// API route to fetch all submitted data
app.get('/all-data', async (req, res) => {
    try {
        const data = await FormData.find().sort({ createdAt: -1 });
        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.json({ success: false, data: [] });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

