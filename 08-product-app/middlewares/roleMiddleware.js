
const adminRole = (req, res, next) => {
    if(req?.user?.role === 'admin') {
        next();
    } else {
        return res.status(403).send('Forbidden');
    };
};

export default adminRole;