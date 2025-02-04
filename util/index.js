const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ id: user.id }, "APPLE", { expiresIn: '10m' });
}

module.exports = generateToken;
