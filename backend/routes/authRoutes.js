const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register admin (use once to create admin account)
// @access  Public
router.post("/register", async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ 
                success: false,
                message: "Please provide username and password" 
            });
        }

        // Check if admin already exists
        let admin = await Admin.findOne({ username });
        if (admin) {
            return res.status(400).json({ 
                success: false,
                message: "Admin already exists" 
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new admin
        admin = new Admin({
            username,
            password: hashedPassword,
            email
        });

        await admin.save();

        res.json({ 
            success: true,
            message: "Admin registered successfully" 
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            success: false,
            message: "Server error" 
        });
    }
});

// @route   POST /api/auth/login
// @desc    Login admin
// @access  Public
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ 
                success: false,
                message: "Please provide username and password" 
            });
        }

        // Check if admin exists
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid credentials" 
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid credentials" 
            });
        }

        // Create JWT token
        const payload = {
            id: admin._id,
            username: admin.username
        };

        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ 
            success: true,
            token,
            admin: {
                id: admin._id,
                username: admin.username,
                email: admin.email
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            success: false,
            message: "Server error" 
        });
    }
});

module.exports = router;