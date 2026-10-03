const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
router.post('/foodData', async (req, res) => {
    try {
        const db = mongoose.connection.db;
        if (!db) {
            return res.status(503).json({ success: false, message: "Food data is unavailable" });
        }

        const [foodItems, foodCategories] = await Promise.all([
            db.collection("food_items").find({}).toArray(),
            db.collection("foodCategory").find({}).toArray()
        ]);

        res.set('Cache-Control', 'no-store');
        res.send([foodItems, foodCategories]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Server Error" })
    }
})
module.exports = router;