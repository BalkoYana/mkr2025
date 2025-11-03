
const invoiceModel = require('../models/invoice.model');

/**
 *
 * @param {object} invoiceData 
 * @returns {Promise<object>} 
 */
async function create(invoiceData) {

    return invoiceModel.create(invoiceData);
}

/**
 * 
 * @param {object} query 
 * @returns {Promise<object>} 
 */
async function find({ searchString = '', page = 1, perPage = 20 }) {
    
    const filter = {};
    if (searchString) {
        
        filter.$or = [
            { invoiceNumber: { $regex: searchString, $options: 'i' } }, // Якщо у вас є поле 'invoiceNumber'
            { client: { $regex: searchString, $options: 'i' } }
        ];
    }
    
    const skip = (Number(page) - 1) * Number(perPage);
    const limit = Number(perPage);

    const items = await invoiceModel.find(filter)
        .skip(skip)
        .limit(limit);

    const count = await invoiceModel.countDocuments(filter);

    return {
        items: items,
        count: count,
    };
}

/**
 * 
 * @param {string} id 
 * @returns {Promise<object|null>} 
 */
async function findById(id) {
    return invoiceModel.findById(id);
}

/**
 * 
 * @param {string} id
 * @param {object} update 
 * @returns {Promise<object|null>}
 */
async function findByIdAndUpdate(id, update) {

    return invoiceModel.findByIdAndUpdate(id, update, { upsert: false, new: true });
};

/**
 * 
 * @param {string} id 
 * @returns {Promise<object|null>}
 */
async function findByIdAndDelete(id) {
    return invoiceModel.findByIdAndDelete(id)
};

/**
 * 
 * @param {object} filter 
 * @returns {Promise<object|null>} 
 */
async function findOne(filter) {
    return invoiceModel.findOne(filter);
}

module.exports = {
    create,
    find,
    findById,
    findByIdAndUpdate,
    findByIdAndDelete,
    findOne
};