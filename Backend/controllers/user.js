const crypto = require('crypto');
const {v4: uuidv4} = require('uuid');
const moment = require('moment');

const UserService = require('../services/user');
const OperationResult = require('../helpers/result');
const MessageCode = require('../resources/messages');
const auth = require("../auth");

/**
 * @typedef UserRegister
 * @property {string} first_name.required - first_name - eg: Vihanga
 * @property {string} last_name.required - last_name - eg: Dehigaspitiya
 * @property {string} email.required - email - eg: vihanga@email.com
 * @property {string} password.required - password - eg: vihanga123
 */

/**
 * Register a new user
 * @group User
 * @route POST /user/register
 * @param {UserRegister.model} UserRegister.body
 * @produces application/json
 * @consumes application/json
 */
const register = async (req, res) => {
    try {
        let user = await UserService.getUserByEmail(req.body.email);
        if (user) return res.status(409).jsonp(OperationResult.failed(MessageCode.ERR_USER_ALREADY_EXISTS));
        const dataValues = {
            id: uuidv4(),
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: crypto
                .createHmac("sha256", process.env.PASSWORD_SECRET_KEY)
                .update(req.body.password)
                .digest("hex"),
            created_at: moment().unix()
        }
        await UserService.addUser(dataValues);

        /*let verificationLink = `${process.env.FRONTEND_URL}/user/verify/${dataValues.id}`
        await email.verificationEmail('account-verification', 'Please verify your email address. You’re almost done.', dataValues, verificationLink);*/
        return res.status(200).jsonp(OperationResult.success({
            id: dataValues.id,
            first_name: dataValues.first_name,
            email: dataValues.email
        }, MessageCode.SCC_USER_ADD_SUCCESS))

    } catch (e) {
        return res.status(500).jsonp(OperationResult.failed(MessageCode.ERR_INTERNAL_SERVER, e.message));
    }
};


/**
 * Verify user account
 * @group User
 * @route GET /user/verify/{id}
 * @param {string} id.path.required
 * @produces application/json
 * @consumes application/json
 */
const verify = async (req, res) => {
    try {
        const user = await UserService.getUserById(req.params.id);
        if (user.is_verified) return res.status(200).jsonp(OperationResult.success(null, MessageCode.SCC_ALREADY_VERIFIED));
        user.is_verified = true;
        await user.save();
        // await email.confirmationEmail('account-confirmation', 'Account Confirmation', user);
        return res.status(200).jsonp(OperationResult.success(null, MessageCode.SCC_ACCOUNT_VERIFIED));

    } catch (e) {
        return res.status(500).jsonp(OperationResult.failed(MessageCode.ERR_INTERNAL_SERVER, e.message));
    }
}

/**
 * @typedef UserLogin
 * @property {string} email.required - email - eg: test@email.com
 * @property {string} password.required - password - eg: 12345
 */

/**
 * User Login
 * @group User
 * @route POST /user/login
 * @param {UserLogin.model} user.body
 * @produces application/json
 * @consumes application/json
 */
const login = async (req, res) => {
    try {
        const passEncrypt = crypto
            .createHmac("sha256", process.env.PASSWORD_SECRET_KEY)
            .update(req.body.password)
            .digest("hex");
        let user = await UserService.getUserByEmail(req.body.email);
        if (!user) return res.status(404).jsonp(OperationResult.failed(MessageCode.ERR_USER_DOES_NOT_EXIST));
        if (!user.is_verified) return res.status(401).jsonp(OperationResult.failed(MessageCode.ERR_USER_NOT_VERIFIED));
        if (user.password !== passEncrypt) return res.status(401).jsonp(OperationResult.failed(MessageCode.ERR_PASSWORD_INCORRECT));
        let userData = {name: user.first_name, id: user.id};
        const token = auth.signAccessToken(userData)
        const refreshToken = await auth.signRefreshToken(userData)
        res.status(200).json(OperationResult.success({
            token,
            refreshToken,
            ...userData
        }));
    } catch (e) {
        return res.status(500).jsonp(OperationResult.failed(MessageCode.ERR_INTERNAL_SERVER, e.message));
    }
};

/**
 * @typedef RefreshToken
 * @property {string} refreshToken.required - refreshToken - eg: refreshToken
 */

/**
 * Get refresh Token
 * @group User
 * @route POST /user/refresh-token
 * @param {RefreshToken.model} RefreshToken.body
 * @produces application/json
 * @consumes application/json
 */
const generateRefreshToken = async (req, res) => {
    try {
        const refreshToken = req.body['value.refreshToken'];
        if (!refreshToken) {
            return res.status(403).jsonp(OperationResult.failed(MessageCode.ERR_MISSING_TOKEN));
        } else {
            const tokenData = await auth.verifyRefreshToken(refreshToken);
            if (!tokenData.status) {
                return res.status(401).json(OperationResult.failed(tokenData.data));
            } else {
                let {id, name} = tokenData.data;
                const token = auth.signAccessToken({id, name})
                const refreshToken = await auth.signRefreshToken({id, name})
                return res.status(200).json(OperationResult.success({
                    token,
                    refreshToken
                }));
            }
        }
    } catch (e) {
        return res.status(500).jsonp(OperationResult.failed(MessageCode.ERR_INTERNAL_SERVER, e.message));
    }
}

/**
 * User Logout
 * @group User
 * @route POST /user/logout
 * @param {RefreshToken.model} RefreshToken.body
 * @produces application/json
 * @consumes application/json
 */
const logout = async (req, res) => {
    try {
        const {refreshToken} = req.body;
        if (!refreshToken) {
            return res.status(403).jsonp(OperationResult.failed(MessageCode.ERR_MISSING_TOKEN));
        } else {
            const tokenData = await auth.verifyRefreshToken(refreshToken);
            if (!tokenData.status) {
                return res.status(401).json(OperationResult.failed(tokenData.data));
            } else {
                const removedToken = await auth.removeToken(tokenData.data.id);
                if (!removedToken) res.status(500).jsonp(OperationResult.failed(MessageCode.ERR_INTERNAL_SERVER));
                res.status(200).jsonp(OperationResult.success(MessageCode.SCC_USER_LOGOUT));
            }
        }
    } catch (e) {
        return res.status(500).jsonp(OperationResult.failed(MessageCode.ERR_INTERNAL_SERVER, e.message));
    }
}

const user = {
    register,
    verify,
    login,
    generateRefreshToken,
    logout
}

module.exports = user;

