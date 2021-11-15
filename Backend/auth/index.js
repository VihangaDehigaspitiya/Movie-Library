const jwt = require('jsonwebtoken');
const MessageCode = require('../resources/messages');
const OperationResult = require('../helpers/result');
const client = require('../helpers/init_redis');

/**
 * Check normal user's authentication
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const checkAuthorization = async (req, res, next) => {
    const header = req.body.token || req.query.token || req.headers['authorization'];
    if (header) {
        const type = header.split(' ');
        if (type[0] === 'Bearer') {
            const token = type[1];
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') return res.status(401).json(OperationResult.failed(MessageCode.ERR_TOKEN_EXPIRED));
                    return res.status(401).json(OperationResult.failed(MessageCode.ERR_UNAUTHORIZED));
                }
                req.user = decoded;
                next();
            });
        } else {
            return res.status(401).jsonp(OperationResult.failed(MessageCode.ERR_MISSING_TOKEN));
        }
    } else {
        return res.status(401).jsonp(OperationResult.failed(MessageCode.ERR_MISSING_TOKEN));
    }
};

/**
 * Create access token
 * @param user
 * @returns {undefined|*}
 */
const signAccessToken = (user) => {
    return jwt.sign(user, process.env.SECRET, {expiresIn: Number(process.env.TOKEN_LIFE)});
}

/**
 * Create refresh token
 * @param user
 * @returns {Promise<unknown>}
 */
const signRefreshToken = (user) => {
    return new Promise((resolve, reject) => {
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: Number(process.env.REFRESH_TOKEN_LIFE)});
        client.SET(user.id, refreshToken, 'EX', Number(process.env.REFRESH_TOKEN_LIFE), (err, reply) => {
            if (err) return reject(err);
        })
        return resolve(refreshToken);
    })
}

/**
 * Verify refresh token
 * @param refreshToken
 * @returns {Promise<unknown>}
 */
const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') resolve({status: false, data: MessageCode.ERR_TOKEN_EXPIRED})
                resolve({status: false, data: MessageCode.ERR_UNAUTHORIZED})
            }
            const userId = decoded.id;
            client.GET(userId, (err, result) => {
                if (err) resolve({status: false, data: MessageCode.ERR_INTERNAL_SERVER})
                if (result !== refreshToken) resolve({status: false, data: MessageCode.ERR_UNAUTHORIZED})
            })
            resolve({status: true, data: decoded});
        })
    })
}

/**
 * Remove refresh tone
 * @param userId
 * @returns {Promise<unknown>}
 */
const removeToken = (userId) => {
    return new Promise((resolve, reject) => {
        client.DEL(userId, (err, val) => {
            if (err) return reject(err)
            console.log(val)
            return resolve(true);
        })
    })
}

const jwtVerification = {
    checkAuthorization,
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
    removeToken,

}

module.exports = jwtVerification;
