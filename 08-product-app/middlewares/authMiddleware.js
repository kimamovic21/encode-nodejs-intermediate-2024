import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.cookies['token'];

    if (!token) {
        return res.status(401).send('Unauthorized!');
    };

    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data;

        next();
    } catch (error) {
        return res.status(403).send('Unverified!');
    };
};

export default verifyToken;