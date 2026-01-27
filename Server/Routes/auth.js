const express = require('express');
const USER=require('../models/userModel');


const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }
        let user = await USER.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        await USER.create({ name, email, password });
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
          