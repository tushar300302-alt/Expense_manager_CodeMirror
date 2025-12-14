const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    note: {
        type: String,
        required: false
    },
    amount: {
        type: Number,
        required: true
    },
    payerId: {
        type: String,
        required: true
    },
    typeId: {
        type: String,
        required: true
    },
}, { timestamps: true });

// Ensure virtual 'id' field is included in toJSON
ExpenseSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Expense', ExpenseSchema);
