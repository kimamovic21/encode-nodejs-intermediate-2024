import User from "../models/User.js";


export const getAllUsers = async (req, res) => {
    const users = await User.find({ }).select('-__v -password');

    res.status(200).send(users);
};


export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const user = await User.findById(id).select('-__v -password');

        if (!user) {
            return res.status(404).send('User not found!');
        };

        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send('Something went wrong. Please try again!');
    };
};


export const updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = req.body;

        if (id === req.user.id) {
            const updatedUser = await User.findByIdAndUpdate(id, user).select('-__v -password');

            if (updatedUser) {
               return res.status(200).send('User updated successfully');
            };
        } else {
            return res.status(403).send('Cannnot update user');
        };
    } catch(error) {
        return res.status(500).send('Something went wrong. Please try again!');
    };
};


export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        if (id === req.user.id) {
            const deletedUser = await User.findByIdAndDelete(id);
            if (deletedUser) {
                return res.status(204).send();
            }; 
        } else {
            return res.status(404).send(`Could not delete user with id ${id}!`);
        };
    } catch (error) {
        return res.status(500).send('Something went wrong. Please try again!');
    };
};
