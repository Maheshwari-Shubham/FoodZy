const express = require('express');
const cors = require('cors');
const mongoDB = require("./db");

const app = express();
const port = 5000;

mongoDB();

// Apply CORS middleware
app.use(cors({
    origin: 'https://food-zy.vercel.app', // Allow only your frontend
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Handle preflight requests
app.options('*', cors());  

app.use(express.json());

// Define routes
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
