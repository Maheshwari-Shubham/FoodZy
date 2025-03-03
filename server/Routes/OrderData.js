const express = require('express');
const router = express.Router();
const Order = require('../Models/Orders');

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    await data.splice(0, 0, { Order_date: req.body.order_date });

    try {
        let eId = await Order.findOne({ email: req.body.email });

        if (!eId) {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
        } else {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
        }

        res.json({ success: true });
    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).json({ error: "Server Error", message: error.message });
    }
});

router.post('/myOrderData', async (req, res) => {
    try {
        let myData = await Order.findOne({ email: req.body.email });

        if (!myData || !myData.order_data) {
            return res.json({ orderData: [] });
        }

        res.json({ orderData: myData.order_data }); // Ensure correct structure
    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).json({ error: "Server Error", message: error.message });
    }
});

module.exports = router;
