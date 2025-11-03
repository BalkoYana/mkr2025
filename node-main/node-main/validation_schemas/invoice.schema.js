const Joi = require('joi');

const invoiceBaseSchema = Joi.object({
    invoiceNumber: Joi.string()
        .min(3)
        .max(50)
        .required()
        .label('Номер рахунку'),
    

    client: Joi.string()
        .min(3)
        .max(100)
        .required()
        .label('Клієнт'),
    
    
    issueDate: Joi.date()
        .required()
        .label('Дата виставлення'),
    
    totalAmount: Joi.number()
        .min(0.01)
        .required()
        .label('Загальна сума'),
});


const invoiceCreateSchema = invoiceBaseSchema;

const invoiceUpdateSchema = Joi.object({
    invoiceNumber: Joi.string().min(3).max(50),
    client: Joi.string().min(3).max(100),
    issueDate: Joi.date(),
    totalAmount: Joi.number().min(0.01)
}).min(1); 

module.exports = {
    invoiceCreateSchema,
    invoiceUpdateSchema,
};