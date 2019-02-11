const boom = require('boom')
const Expenses = require('../models/Expenses')
const Incomes = require('../models/Incomes')

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expenses.find()
        return expenses
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.addExpense = async (req, res) => {
    try {
        const model = new Expenses(req.body)
        model.save()
        const monthIncome = await Incomes.findOne({'year':model.year,'month':model.month})
        monthIncome.amount -= model.cost
        const update = await Incomes.findByIdAndUpdate(monthIncome._id, monthIncome, { new: true })
        return  monthIncome;
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.getExpensesByYearAndMonth = async (req, res) => {
    try {
        const year = req.params.year
        const month = req.params.month
        const expense = Expenses.find({'year':year,'month':month})
        return expense
    } catch (error) {
        throw boom.boomify(error)

    }
}

exports.updateExpense = async (req, res) => {
    try {
        const id = req.params.id
        const expense = req.body
        const currentExpense = await Expenses.findById(id)
        const difference = currentExpense.cost - expense.cost

        const { ...updateExpense} = expense
        await Expenses.findByIdAndUpdate(id, updateExpense, {new: true})

        const relatedIncome = await Incomes.findOne({'year':expense.year,'month':expense.month})
        relatedIncome.amount += difference
        const updatedIncome = await Incomes.update({'_id':relatedIncome._id},{'amount':relatedIncome.amount})
        return updatedIncome
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        const id = req.params.id
        const expense = await Expenses.findByIdAndRemove(id)
        const relatedIncome = await Incomes.findOne({'year':expense.year,'month':expense.month})
        relatedIncome.amount += expense.cost
        const updatedIncome = await Incomes.update({'_id':relatedIncome._id},{'amount':relatedIncome.amount})
        return updatedIncome
    } catch (error) {
        throw boom.boomify(error)
    }
}