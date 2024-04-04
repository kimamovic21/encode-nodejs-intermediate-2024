import fs from 'node:fs/promises';

export const register = async (req, res) => {
    // console.log(req.body);
    // res.status(200).send('Register called');

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
            users.push(user);
            await fs.writeFile('./db.json', JSON.stringify({ users }));
            res.status(201).send('User created successfully!');
        };
    } catch (error) {
        res.status(500).send('Could not register user!');        
    }
};
