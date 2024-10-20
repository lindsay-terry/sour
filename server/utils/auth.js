const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const expiration = '1h';

module.exports = {
    authMiddleware({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch (error) {
            console.error('Error during the authMiddleware process', error);
        }
        return req;
    },
    signToken({ username, _id }) {
        const payload = { username, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};