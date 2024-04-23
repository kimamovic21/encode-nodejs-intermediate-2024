import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
    const users = await User.find({ });

    res.status(200).send(users);
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, user);

        res.status(200).send('User updated successfully');
    } catch(error) {
        res.status(500).send('Something went wrong');
    }
};