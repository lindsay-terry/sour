const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const expiration = '1h';

module.exports = {
    authMiddleware(req, res, next) {
        console.log('LOGGED FROM AUTH MIDDLEWARE', req.body); // Check the structure of req.body
        let token = req.body.token || req.query.token || req.headers.authorization;
        console.log('TOKEN', token)

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return next();
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            console.log('LOGGED DATA FROM AUTH:', data)
            req.user = data;
        } catch (error) {
            console.error('Error during the authMiddleware process:', error);
            return resizeBy.status(401).json({ message: 'Unauthorized' });
        }
        next();
    },
    signToken({ username, _id, spotify_id }) {
        const payload = { username, _id, spotify_id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};