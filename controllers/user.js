const { User } = require('../models');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = jwt.sign({ id: user.id }, 'your_jwt_secret');
        res.status(201).send({ user, token });
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await user.validatePassword(password))) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }
        const token = jwt.sign({ id: user.id }, 'zws6W9TwH0oDrsmrThufdkbjy3cVK7Ng');
        res.send({ user, token });
    } catch (err) {
        res.status(500).send(err);
    }
};
