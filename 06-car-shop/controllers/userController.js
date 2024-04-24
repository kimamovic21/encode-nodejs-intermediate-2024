import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
    const users = await User.find({ });

    res.status(200).send(users);
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).send(user);
    } catch(error) {
        res.status(500).send('Something went wrong');
    }
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

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedUser = await User.findByIdAndDelete(id);

        if (deletedUser) {
            res.status(200).send('User deleted successfully!');
        } else {
            res.status(404).send('User not found!');
        } 
    } catch(error) {
        res.status(500).send('Something went wrong');
    }
};