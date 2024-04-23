import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/User.js";

export const registerUser = async (req, res) => {
    const data = req.body;
    const userExists = await User.findOne({ email: data.email });

    if (userExists) {
        return res.status(403).send('User with that email already exists!');
    };

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    const user = new User(req.body);

    try {
        const result = await user.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send('Could not create user!');
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
                firstName: user.firstName,
                lastName: user.lastName,
                id: user._id,
                email: user.email
            };

            const token = jwt.sign(payload, 'SUPERKEY123', { expiresIn: 60 * 60 });
            res.status(200).send({ token });
        } else {
            return res.status(401).send('Wrong credentials!');
        }
    } catch(error) {
        res.status(500).send('Something went wrong');
    };
};
