require('dotenv').config();
const express = require('express')
const cors = require('cors');
const app = express()
const port = Number(process.env.PORT) || 5000
const mongoDB = require("./db")
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:3000,https://food-zy.vercel.app')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Origin is not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

const startServer = async () => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET must be configured");
    }

    await mongoDB();
    app.listen(port, () => {
        console.log(`FoodZy API listening on port ${port}`);
    });
};

startServer().catch((error) => {
    console.error("Server startup failed:", error.message);
    process.exit(1);
});
