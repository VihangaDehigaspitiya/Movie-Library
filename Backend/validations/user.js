const Joi = require('joi');
const OperationResult = require("../helpers/result");

exports.create = function (req, res, next) {
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
