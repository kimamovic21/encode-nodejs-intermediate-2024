import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET;

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

        const token = jwt.sign(payload,JWT_SECRET);

        res.cookie('token', token, { httpOnly: true });
        return res.status(200).send('Cookie sent!');
    } else {
        return res.status(401).send('Invalid username or password!');
    };
};
