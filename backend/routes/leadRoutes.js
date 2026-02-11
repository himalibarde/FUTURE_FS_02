const express = require("express");
const Lead = require("../models/Lead");
const auth = require("../middleware/auth");

const router = express.Router();

// @route   POST /api/leads
// @desc    Create a new lead
// @access  Public (for contact form submissions)
router.post("/", async (req, res) => {
    try {
        const lead = new Lead(req.body);
        await lead.save();

        res.json({ 
            success: true,
            message: "Lead created successfully",
            lead 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            success: false,
            message: "Error creating lead" 
        });
    }
});

// @route   GET /api/leads
// @desc    Get all leads
// @access  Private (admin only)
router.get("/", auth, async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        
        res.json({ 
            success: true,
            count: leads.length,
            leads 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            success: false,
            message: "Error fetching leads" 
        });
    }
});

// @route   GET /api/leads/:id
// @desc    Get single lead
// @access  Private
router.get("/:id", auth, async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        
        if (!lead) {
            return res.status(404).json({ 
                success: false,
                message: "Lead not found" 
            });
        }

        res.json({ 
            success: true,
            lead 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            success: false,
            message: "Error fetching lead" 
        });
    }
});

// @route   PUT /api/leads/:id
// @desc    Update lead
// @access  Private
router.put("/:id", auth, async (req, res) => {
    try {
        const lead = await Lead.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!lead) {
            return res.status(404).json({ 
                success: false,
                message: "Lead not found" 
            });
        }

        res.json({ 
            success: true,
            message: "Lead updated successfully",
            lead 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            success: false,
            message: "Error updating lead" 
        });
    }
});

// @route   DELETE /api/leads/:id
// @desc    Delete lead
// @access  Private
router.delete("/:id", auth, async (req, res) => {
    try {
        const lead = await Lead.findByIdAndDelete(req.params.id);

        if (!lead) {
            return res.status(404).json({ 
                success: false,
                message: "Lead not found" 
            });
        }

        res.json({ 
            success: true,
            message: "Lead deleted successfully" 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            success: false,
            message: "Error deleting lead" 
        });
    }
});

// @route   GET /api/leads/stats/summary
// @desc    Get lead statistics
// @access  Private
router.get("/stats/summary", auth, async (req, res) => {
    try {
        const totalLeads = await Lead.countDocuments();
        const newLeads = await Lead.countDocuments({ status: "New" });
        const contactedLeads = await Lead.countDocuments({ status: "Contacted" });
        const convertedLeads = await Lead.countDocuments({ status: "Converted" });

        res.json({
            success: true,
            stats: {
                total: totalLeads,
                new: newLeads,
                contacted: contactedLeads,
                converted: convertedLeads
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            success: false,
            message: "Error fetching statistics" 
        });
    }
});

module.exports = router;