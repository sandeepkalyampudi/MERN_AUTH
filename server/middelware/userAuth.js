import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.json({ success: false, message: 'Unauthorized' });
    }
    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecoded.id) {
            req.userId = tokenDecoded.id;
        } else {
            return res.json({ success: false, message: 'Unauthorized' });
        }
        next();
    } catch (error) {
        console.error('Authentication error:', error.message || error);
        return res.json({ success: false, message: 'Error in authenticating user' });
    }
};

export default userAuth;