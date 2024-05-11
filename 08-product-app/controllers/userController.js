import bcrypt from 'bcrypt';

import User from "../models/User.js";

export const createUser = async (req, res) => {
    const data = req.body;

    const hashedPassword = await bcrypt.hash(data.password,10);
    data.password = hashedPassword;

    const user = new User(data);
    
    try {
        await user.save();

        return res.status(201).send('User created successfully!');
    }
    catch (error) {
        return res.status(500).sent('Something went wrong');
    };
};