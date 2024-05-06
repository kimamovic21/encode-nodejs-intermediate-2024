import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);


export const registerUser = async (req, res) => {
    const data = req.body;
    const userExists = await User.findOne({ email: data.email });

    if (userExists) {
        return res.status(403).send('User with that email already exists!');
    };

    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
    data.password = hashedPassword;

    const user = new User(req.body);

    try {
        const result = await user.save();
        return res.status(201).send(result);
    } catch (error) {
        return res.status(500).send('Could not create user!');
    };
};


export const loginUser = async (req, res) => {
    try {
        const { email, password} = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).send('Wrong credentials!');
        };

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const payload = {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            };

            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
            
            return res.status(200).send({ token });
        } else {
            return res.status(401).send('Wrong credentials!');
        };
    } catch(error) {
        return res.status(500).send('Something went wrong');
    };
};
