const createError = require('http-errors');

const { invoiceCreateSchema, invoiceUpdateSchema } = require('../validation_schemas/invoice.schema'); 


function invoiceByIdValidation(req, res, next) {
    const { invoiceId } = req.params;

    if (!invoiceId.match(/^[0-9a-fA-F]{24}$/)) {
        return next(createError(400, 'Invalid Invoice ID format.'));
    }
    
    next();
}

function invoiceCreateValidation(req, res, next) {
    const { error } = invoiceCreateSchema.validate(req.body);

    if (error) {
        const errorMessage = error.details.map(detail => detail.message).join(', ');
        return next(createError(400, `Validation failed: ${errorMessage}`));
    }
    
    next();
}
function invoiceUpdateValidation(req, res, next) {
    
    const { error } = invoiceUpdateSchema.validate(req.body);

    if (error) {
        const errorMessage = error.details.map(detail => detail.message).join(', ');
        return next(createError(400, `Validation failed: ${errorMessage}`));
    }

    next();
}

module.exports = {
    invoiceByIdValidation,
    invoiceCreateValidation,
    invoiceUpdateValidation,
};