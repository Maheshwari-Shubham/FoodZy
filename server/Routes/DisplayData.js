const express = require('express')
const router = express.Router()

router.post('/foodData', (req, res) => {
    try {
        if (!Array.isArray(global.food_items) || !Array.isArray(global.foodCategory)) {
            return res.status(503).json({ success: false, message: "Food data is unavailable" });
        }

        res.send([global.food_items, global.foodCategory])
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Server Error" })
    }
})
module.exports = router;