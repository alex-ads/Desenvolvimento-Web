const joi = require('joi');

const validatePeople = (req, res, next) => {
    const people = req.body;
    const schema = joi.object({
        firstName: joi.string().min(1).max(30).required()
    })

    const { error } = schema.validate(people)

    if (error) {
        return res.status(400).json({ error })
    }

    next()
}

module.exports = validatePeople;
