const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, 'zws6W9TwH0oDrsmrThufdkbjy3cVK7Ng');
        const user = await User.findByPk(decoded.id);
        if (!user) {
            throw new Error();
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};
