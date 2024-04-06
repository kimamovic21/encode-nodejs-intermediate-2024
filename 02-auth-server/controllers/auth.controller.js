import fs from 'node:fs/promises';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../config.js';

export const register = async (req, res) => {
    const user = req.body;

    if (user.password !== user.repeatPassword) {
        return res.status(400).send('Password and Repeat Password do not match!');
    };

    try {
        const db = await fs.readFile('./db.json', { encoding: 'utf8' });
        const { users } = JSON.parse(db);

        const isUserAlreadyRegistered = users.find((usr) => usr.email === user.email);

        if (isUserAlreadyRegistered) {
            return res.status(409).send(`User with that email: ${user.email} already exists!`);
        } else {
            delete user.repeatPassword;

            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;

            users.push(user);

            await fs.writeFile('./db.json', JSON.stringify({ users }, null, '\t'));
            res.status(201).send('User created successfully!');
        };
    } catch (error) {
        res.status(500).send('Could not register user!');        
    };
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const db = await fs.readFile('./db.json', { encoding: 'utf8' });        
        const { users } = JSON.parse(db); 

        const user = users?.find((user) => user.email === email);

        if (!user) {
            return res.status(404).send('User not found!');
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
            const payload = {
                email: user.email,
                name: user.name
            };
            const token = await jwt.sign(payload, JWT_KEY, { expiresIn: 60*60 });

            // return res.status(200).send('Login successfull!');
            return res.status(200).send({ jwt: token });
        } else {
            return res.status(401).send('Wrong email or password!');
        }
    } catch (error) {
        res.status(500).send('Something went wrong!');
    };
};

export const privateEndpoint = async (req, res) => {
    // console.log(req.headers);
    const token = req.headers['authorization'];
    // console.log(token);

    try {
        const payload = await jwt.verify(token, JWT_KEY);
        console.log(payload);
        res.send('Token valid');
    } catch (error) {
        res.status(401).send('Unauthorized');
    }
};
