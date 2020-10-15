const jwt = require('jwt-simple');
const moment = require('moment');
const conf = require("./../config/jwt.config");

const checkToken = (req, res, next) => {
    if (!req.headers['user_token'])
        return res.json({
            error: "tienes que incluir los headers"
        });
    const token = req.headers['user_token'];
    let payload = null;
    try {
        payload = jwt.decode(token, conf.TOKEN_KEY);
    } catch (err) {
        return res.json({
            error: 'Token invalido'
        });
    }
    if (moment().unix() > payload.expireAt) {
        return res.json({
            error: 'Token expirado'
        });
    }
    req.userId = payload.userId;
    next();
};

module.exports = checkToken;