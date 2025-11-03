const mongoose = require('mongoose');
const config = require('./config');
const Invoice = require('./models/invoice.model');
const { mockInvoices } = require('./helpers/mock-data'); // Переконайтеся, що шлях правильний

async function seedDatabase() {
    console.log('--- Початок завантаження тестових даних (Seeding) ---');
    
    
    await mongoose.connect(config.mongodb_url);
    console.log('MongoDB підключено.');

    try {
    
        await Invoice.deleteMany({});
        console.log('Колекція Invoices очищена.');

        const createdInvoices = await Invoice.insertMany(mockInvoices);
        console.log(`Успішно додано ${createdInvoices.length} рахунків-фактур.`);

    } catch (error) {

        console.error('Помилка під час завантаження даних:', error.message);
    } finally {
       
        await mongoose.connection.close();
        console.log('З\'єднання з MongoDB закрито.');
        console.log('--- Завантаження даних завершено ---');
    }
}

seedDatabase().catch(err => {
    console.error('Критична помилка виконання скрипту: ', err.message);
    process.exit(1);
});