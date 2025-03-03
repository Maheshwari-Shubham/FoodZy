const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = "MYNAMEISENDTOENDYOUTUBECHANNEL$#";

// ✅ Route to Create User
router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password', "Incorrect Password").isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const salt = await bcrypt.genSalt(10);
            let secPassword = await bcrypt.hash(req.body.password, salt);

            let user = await User.create({
                name: req.body.name,
                password: secPassword,
                location: req.body.location,
                email: req.body.email
            });

            // ✅ Generate auth token for auto-login
            const data = { user: { id: user.id } };
            const authToken = jwt.sign(data, jwtSecret);

            res.json({ success: true, authToken: authToken });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Server Error" });
        }
    }
);

// ✅ Route to Login User
router.post("/loginuser", [
    body('email').isEmail(),
    body('password', "Incorrect Password").isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ success: false, message: "Invalid credentials" });
            }

            const pwdCompare = await bcrypt.compare(req.body.password, user.password);
            if (!pwdCompare) {
                return res.status(400).json({ success: false, message: "Invalid credentials" });
            }

            const data = { user: { id: user.id } };
            const authToken = jwt.sign(data, jwtSecret);

            res.json({ success: true, authToken: authToken });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Server Error" });
        }
    }
);

module.exports = router;
