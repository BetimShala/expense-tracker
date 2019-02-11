const mongoose = require('mongoose')

const ExpensesSchema = mongoose.Schema({
    year: Number,
    month: Number,
    day_hour: Date,
    description:String,
    cost: Number
})

module.exports = mongoose.model('Expenses', ExpensesSchema)