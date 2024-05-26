const Joi = require("joi");

const validateTransaction = (req, res, next) => {
    const transaction = req.body;

    const schema = Joi.object({
        name: Joi.string().min(1).max(30).required(),
        description: Joi.string().min(1).max(100).required(),
        price: Joi.number().precision(2).required(),
        type: Joi.number().integer().min(1).max(3).required(),
        person_id: Joi.number().integer().required(), 
    });

    const { error } = schema.validate(transaction);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

module.exports = validateTransaction;
