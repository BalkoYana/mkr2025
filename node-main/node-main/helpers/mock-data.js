
const mockInvoices = [
    {
        invoiceNumber: "INV-2025-001",
        client: "ТОВ 'Енергія Будівництва'",
        issueDate: new Date('2025-10-01T10:00:00Z'),
        totalAmount: 15500.50
    },
    {
        invoiceNumber: "INV-2025-002",
        client: "ФОП Кухарчук О.П.",
        issueDate: new Date('2025-10-05T15:30:00Z'),
        totalAmount: 5200.00
    },
    {
        invoiceNumber: "INV-2025-003",
        client: "Global Tech Solutions LLC",
        issueDate: new Date('2025-10-12T09:00:00Z'),
        totalAmount: 98750.99
    },
    {
        invoiceNumber: "INV-2025-004",
        client: "ТОВ 'Енергія Будівництва'", 
        issueDate: new Date('2025-10-20T11:45:00Z'),
        totalAmount: 7300.25
    },
];

module.exports = {
    
    mockInvoices 
};