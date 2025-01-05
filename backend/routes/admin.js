const express = require('express');
const User = require('../models/User');
const Class = require('../models/Class');
const Announcement = require('../models/Announcement');

const router = express.Router();

// Create a class
router.post('/classes', async (req, res) => {
    try {
        const { name, teacherId } = req.body;
        const newClass = new Class({ name, teacher: teacherId });
        await newClass.save();
        res.status(201).json(newClass);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create an announcement
router.post('/announcements', async (req, res) => {
    try {
        const { title, content, creatorId } = req.body;
        const newAnnouncement = new Announcement({ title, content, creator: creatorId });
        await newAnnouncement.save();
        res.status(201).json(newAnnouncement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a user
router.post('/users', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
