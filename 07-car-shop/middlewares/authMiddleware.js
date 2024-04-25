import jwt from 'jsonwebtoken';

const verify = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.status(401).send('Unauthorized!');
    };

    try {
        const decoded = jwt.verify(token, 'SUPERKEY123');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send('Invalid Token!');
    };
};

export default verify;
