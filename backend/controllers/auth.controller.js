const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Manager = require('../models/transportManagerModel');

const sanitizeManager = (manager) => ({
    id: manager._id,
    _id: manager._id,
    name: manager.name,
    email: manager.email,
});

exports.registerManager = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email and password are required' });
    }

    try {
        const existingManager = await Manager.findOne({ email });
        if (existingManager) {
            return res.status(409).json({ message: 'Manager already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const manager = await Manager.create({ name, email, password: hashedPassword });

        res.status(201).json(sanitizeManager(manager));
    } catch (error) {
        console.error('[auth] register error', error);
        res.status(500).json({ message: 'Unable to register manager' });
    }
};

exports.loginManager = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const manager = await Manager.findOne({ email });

        if (!manager) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, manager.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const payload = sanitizeManager(manager);
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev-secret', {
            expiresIn: '12h',
        });

        res.json({ ...payload, token });
    } catch (error) {
        console.error('[auth] login error', error);
        res.status(500).json({ message: 'Unable to login manager' });
    }
};

