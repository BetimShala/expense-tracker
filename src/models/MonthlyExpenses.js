const mongoose = require('mongoose')

const monthlyExpensesSchema = mongoose.Schema({
    year: Number,
    month: Number,
    day_hour: Date,
    description:String,
    cost: Number
})

module.exports = mongoose.model('MonthlyExpenses', monthlyExpensesSchema)