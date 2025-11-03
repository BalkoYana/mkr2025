const express = require('express');
const router = express.Router();

const controller = require('../controllers/invoices.controller');
const middleware = require('../middlewares/invoices.middleware'); 

router.route('/')
    .post(
        middleware.invoiceCreateValidation,
        controller.createInvoice
    )
    .get(controller.getInvoices);
router.route('/:invoiceId')
    .get(
        middleware.invoiceByIdValidation, 
        controller.getInvoice
    )

    .put(
        middleware.invoiceByIdValidation, 
        middleware.invoiceUpdateValidation,  
        controller.updateInvoice
    )
    .patch(
        middleware.invoiceByIdValidation,  
        middleware.invoiceUpdateValidation,  
        controller.updateInvoice
    )
    
    .delete(
        middleware.invoiceByIdValidation, 
        controller.deleteInvoice
    );


module.exports = router;