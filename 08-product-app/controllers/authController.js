import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';


export const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).send('Invalid username or password');
    };

    const isPasswordGood = await bcrypt.compare(password,user.password);

    if (isPasswordGood) {
        const payload = {
            name: user.name,
            username: user.username,
            role: user.role,
        };
        const token = jwt.sign(payload, 'KEY123');
        res.cookie('token', token, { httpOnly: true });
        res.send('Cookie sent!');
    } else {
        return res.status(401).send('Invalid username or password');
    };
};
