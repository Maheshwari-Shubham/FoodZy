const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authorization = req.get('authorization') || '';
    const token = authorization.startsWith('Bearer ')
        ? authorization.slice(7).trim()
        : '';

    if (!token) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.user || !decoded.user.id) {
            return res.status(401).json({ success: false, message: 'Invalid authentication token' });
        }

        req.userId = decoded.user.id;
        return next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid or expired authentication token' });
    }
};

module.exports = authenticateToken;