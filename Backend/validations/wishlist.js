const Joi = require('joi');
const OperationResult = require("../helpers/result");

exports.create =  (req, res, next) => {
    const data = req.body;
    // define the validation schema
    const schema = Joi.object().keys({
        movie_id: Joi.number().integer().required(),
        is_added_wishlist: Joi.boolean().required(),
        title: Joi.string().required(),
        image: Joi.string().required(),
        release_date: Joi.string().required(),
        genre: Joi.string().required(),
    });

    const { error } = schema.validate(data);

    if (error) return res.status(422).jsonp(OperationResult.failed(error.message));

    next()
}

exports.delete =  (req, res, next) => {
    const data = req.body;
    // define the validation schema
    const schema = Joi.object().keys({
        movies: Joi.array().items(Joi.string().required()).required(),
    });

    const { error } = schema.validate(data);

    if (error) return res.status(422).jsonp(OperationResult.failed(error.message));

    next()
}
