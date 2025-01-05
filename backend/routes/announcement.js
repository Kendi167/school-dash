const express = require('express');
const { authenticateUser, isTeacher } = require('../middleware/auth');
const Announcement = require('../models/Announcement');

const router = express.Router();

// Teacher posts an announcement
router.post('/', authenticateUser, isTeacher, async (req, res) => {
    const { title, content } = req.body;
    try {
        const newAnnouncement = new Announcement({
            title,
            content,
            teacher: req.user._id,
        });
        await newAnnouncement.save();
        res.status(201).json({ message: 'Announcement created successfully.', announcement: newAnnouncement });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all announcements (accessible to all roles)
router.get('/', authenticateUser, async (req, res) => {
    try {
        const announcements = await Announcement.find().populate('teacher', 'name');
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
