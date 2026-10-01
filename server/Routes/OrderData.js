const express = require('express');
const router = express.Router();
const Order = require('../Models/Orders');
const User = require('../Models/User');
const authenticateToken = require('../Middleware/auth');
const { body, validationResult } = require('express-validator');

router.post('/orderData', authenticateToken, [
    body('order_data').isArray({ min: 1 }),
    body('order_date').isString().trim().notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Authenticated user no longer exists' });
        }

        const orderData = [{ Order_date: req.body.order_date }, ...req.body.order_data];
        const existingOrder = await Order.findOne({ email: user.email });

        if (!existingOrder) {
            await Order.create({
                email: user.email,
                order_data: [orderData]
            });
        } else {
            await Order.findOneAndUpdate(
                { email: user.email },
                { $push: { order_data: orderData } }
            );
        }

        res.json({ success: true });
    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

router.post('/myOrderData', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Authenticated user no longer exists' });
        }

        const myData = await Order.findOne({ email: user.email });

        if (!myData || !myData.order_data) {
            return res.json({ orderData: [] });
        }

        res.json({ orderData: myData.order_data });
    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

module.exports = router;
