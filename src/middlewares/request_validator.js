const { body, validationResult} = require('express-validator');

module.exports.sanitizePublishRequest = [
    body('message').not().isEmpty()
        .isString()
        .withMessage('message must be a string')
        .isLength({min: 1})
        .withMessage('message cannot be empty'),
]

module.exports.sanitizeSubscribeRequest = [
    body('url').not().isEmpty()
        .isURL()
        .withMessage('url param must be a valid url')
        .isString()
        .withMessage('url must be a string')
]



module.exports.validateRequest = (req, res, next) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'RequestValidationError',
            message: 'Bad request',
            data: {
                errors: errors.array() 
            }
        })
    }

    next();
};