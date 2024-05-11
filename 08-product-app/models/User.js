import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'user',
    },
});

const User = mongoose.model('User', userSchema);

export default User;