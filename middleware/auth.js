const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer.length > 1 ? bearer[1] : null;
        if (!bearerToken) {
            return res.status(401).json({ msg: 'Authorization denied' });
        }

        try {
            const decoded = jwt.verify(bearerToken, config.get('jwtSecret'));
            if (decoded) {
                req.user = decoded.user;
            } else {
                res.status(401).json({ msg: 'Token is not valid' });
            }
        } catch (err) {
            res.status(401).json({ msg: 'Token is not valid' });
        }

        // req.token = bearerToken;
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
    // const token = req.header('x-auth-token');

    // if (!token) {
    //     return res.status(401).json({ msg: 'Authorization denied' });
    // }

    // try {
    //     const decoded = jwt.verify(token, config.get('jwtSecret'));

    //     req.user = decoded.user;
    //     next();
    // } catch (err) {
    //     res.status(401).json({ msg: 'Token is not valid' });
    // }
};
