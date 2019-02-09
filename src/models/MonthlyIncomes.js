const mongoose = require('mongoose')

const monthlyIncomesSchema = new mongoose.Schema({
    year: Number,
    month: Number,
    amount: Number
})

module.exports = mongoose.model('MonthlyIncomes', monthlyIncomesSchema)
