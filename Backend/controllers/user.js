const crypto = require('crypto');
const {v4: uuidv4} = require('uuid');
const moment = require('moment');

const UserService = require('../services/user');
const OperationResult = require('../helpers/result');
const MessageCode = require('../resources/messages');

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

const user = {
    register,
    verify
}

module.exports = user;

