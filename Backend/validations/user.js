const Joi = require('joi');
const OperationResult = require("../helpers/result");
const UserService = require("../services/user");
const MessageCode = require("../resources/messages");

exports.create =  (req, res, next) => {
    const data = req.body;
    // define the validation schema
    const schema = Joi.object().keys({
        first_name: Joi.string().max(49).required(),
        last_name: Joi.string().max(99).required(),
        email:  Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().max(25).required(),
    });

    const { error } = schema.validate(data);

    if (error) return res.status(422).jsonp(OperationResult.failed(error.message));

    next()
}

exports.userById = async (req, res, next) => {
    const userId = req.params.id;
    // define the validation schema

    const user = await UserService.getUserById(userId);
    if (!user) return res.status(404).jsonp(OperationResult.failed(MessageCode.ERR_USER_DOES_NOT_EXIST));

    next()
}

exports.login =  (req, res, next) => {
    const data = req.body;
    // define the validation schema
    const schema = Joi.object().keys({
        email:  Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().max(25).required(),
    });

    const { error } = schema.validate(data);

    if (error) return res.status(422).jsonp(OperationResult.failed(error.message));

    next()
}

exports.forgotPassword =  (req, res, next) => {
    const data = req.body;
    // define the validation schema
    const schema = Joi.object().keys({
        email:  Joi.string().email({ minDomainSegments: 2 }).required(),
    });

    const { error } = schema.validate(data);

    if (error) return res.status(422).jsonp(OperationResult.failed(error.message));

    next()
}

exports.resetPasswordOTP =  (req, res, next) => {
    const data = req.body;
    // define the validation schema
    const schema = Joi.object().keys({
        otp:  Joi.number().integer().required(),
    });

    const { error } = schema.validate(data);

    if (error) return res.status(422).jsonp(OperationResult.failed(error.message));

    next()
}

exports.resetPassword =  (req, res, next) => {
    const data = req.body;
    // define the validation schema
    const schema = Joi.object().keys({
        otp:  Joi.number().integer().required(),
        password:  Joi.string().required(),
    });

    const { error } = schema.validate(data);

    if (error) return res.status(422).jsonp(OperationResult.failed(error.message));

    next()
}
