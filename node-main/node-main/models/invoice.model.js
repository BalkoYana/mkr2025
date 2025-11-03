const mongoose = require('mongoose');
const InvoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true, 
        trim: true
    },
    
    
    client: {
        type: String, 
        required: true,
        trim: true
       
    },
    
    issueDate: {
        type: Date,
        required: true,
        default: Date.now 
    },
    
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    }
}, {

    timestamps: true 
});

const InvoiceModel = mongoose.model('Invoice', InvoiceSchema);

module.exports = InvoiceModel;