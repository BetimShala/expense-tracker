const mongoose = require('mongoose')

const IncomesSchema = new mongoose.Schema({
    year: Number,
    month: Number,
    amount: Number
})

module.exports = mongoose.model('Incomes', IncomesSchema)
