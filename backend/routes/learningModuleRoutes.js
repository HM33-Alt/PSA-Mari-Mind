const express = require('express');
const router = express.Router();
const LearningModule = require('../models/LearningModule'); // Ensure this path is correct

// Example route
router.get('/', async (req, res) => {
    try {
        const modules = await LearningModule.find();
        res.json(modules);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;