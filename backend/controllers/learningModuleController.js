// controllers/learningModuleController.js
const LearningModule = require('../models/LearningModule');

exports.getAllModules = async (req, res) => {
    try {
        const modules = await LearningModule.find();
        res.json(modules);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createModule = async (req, res) => {
    const module = new LearningModule({
        title: req.body.title,
        content: req.body.content
    });

    try {
        const newModule = await module.save();
        res.status(201).json(newModule);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};