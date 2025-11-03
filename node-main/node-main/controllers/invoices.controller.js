const invoiceService = require('../services/invoices.service'); 
const createError = require('http-errors');


async function createInvoice(req, res, next) {
    try {
        const newInvoice = await invoiceService.create(req.body);

        res.status(201).json({ 
            status: 201,
            data: newInvoice,
        });
    } catch (err) {
      
        next(createError.InternalServerError(err.message));
    }
};


async function getInvoices(req, res, next) {
    try {
        
        const invoices = await invoiceService.find(req.query);

        res.status(200).json({
            status: 200,
            data: invoices,
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
};


async function getInvoice(req, res, next) {
    try {
        const { invoiceId } = req.params; 
        const invoice = await invoiceService.findById(invoiceId);

        if (!invoice) {
            return res.status(404).json({ 
                status: 404,
                error: {
                    message: 'Invoice not found.'
                },
            });
        }

        res.status(200).json({
            status: 200,
            data: invoice,
        });
    } catch (err) {
        
        next(createError.InternalServerError(err.message));
    }
};

async function updateInvoice(req, res, next) {
    try {
        const { invoiceId } = req.params;
        const invoiceData = req.body;
        
        await invoiceService.findByIdAndUpdate(invoiceId, invoiceData);

        res.status(200).json({
            status: 200,
            message: 'Invoice updated successfully.',
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
};

async function deleteInvoice(req, res, next) {
    try {
        const { invoiceId } = req.params;
        await invoiceService.findByIdAndDelete(invoiceId);

        res.status(200).json({
            status: 200,
            message: 'Invoice deleted successfully.',
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
};


module.exports = {
    createInvoice,
    getInvoices,
    getInvoice,
    updateInvoice,
    deleteInvoice,
};